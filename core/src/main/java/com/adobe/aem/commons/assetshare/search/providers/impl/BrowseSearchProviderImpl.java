package com.adobe.aem.commons.assetshare.search.providers.impl;

import com.adobe.aem.commons.assetshare.components.predicates.BrowsePagePredicate;
import com.adobe.aem.commons.assetshare.components.predicates.impl.FulltextPredicateImpl;
import com.adobe.aem.commons.assetshare.components.search.SearchConfig;
import com.adobe.aem.commons.assetshare.search.SearchSafety;
import com.adobe.aem.commons.assetshare.search.UnsafeSearchException;
import com.adobe.aem.commons.assetshare.search.providers.QuerySearchPostProcessor;
import com.adobe.aem.commons.assetshare.search.providers.QuerySearchPreProcessor;
import com.adobe.aem.commons.assetshare.search.providers.SearchProvider;
import com.adobe.aem.commons.assetshare.search.results.AssetResult;
import com.adobe.aem.commons.assetshare.search.results.FolderResult;
import com.adobe.aem.commons.assetshare.search.results.Result;
import com.adobe.aem.commons.assetshare.search.results.Results;
import com.adobe.aem.commons.assetshare.search.results.impl.results.BrowseResultsImpl;
import com.adobe.aem.commons.assetshare.util.ModelCache;
import com.day.cq.search.Predicate;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import org.apache.commons.lang3.StringUtils;
import org.apache.jackrabbit.JcrConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.jcr.resource.api.JcrResourceConstants;
import org.apache.sling.models.factory.ModelFactory;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.annotations.ReferenceCardinality;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import java.util.*;
import java.util.stream.Collectors;

import static org.osgi.framework.Constants.SERVICE_RANKING;

@Component(property = {
                SERVICE_RANKING + ":Integer=-10000"
            },
           service = SearchProvider.class
)
public class BrowseSearchProviderImpl implements SearchProvider {
    private static final Logger log = LoggerFactory.getLogger(BrowseSearchProviderImpl.class);

    public static final String ID = "browse";

    @Reference
    private SearchSafety searchSafety;

    @Reference
    private QueryBuilder queryBuilder;

    @Reference
    private ModelFactory modelFactory;

    @Reference(cardinality = ReferenceCardinality.OPTIONAL)
    private QuerySearchPreProcessor querySearchPreProcessor;

    @Reference(cardinality = ReferenceCardinality.OPTIONAL)
    private QuerySearchPostProcessor querySearchPostProcessor;

    @Override
    public String getId() {
        return ID;
    }

    @Override
    public boolean accepts(final SlingHttpServletRequest request) {
        final String spid = StringUtils.stripToNull(request.getParameter(SearchProvider.SEARCH_PROVIDER_ID));
        if (spid != null) {
            return getId().equals(spid);
        } else {
            final ModelCache modelCache = request.adaptTo(ModelCache.class);
            final SearchConfig searchConfig = modelCache.get(SearchConfig.class);
            return getId().equals(searchConfig.getSearchProviderId());
        }
    }

    @Override
    public Results getResults(final SlingHttpServletRequest request) throws UnsafeSearchException, RepositoryException {

        final ResourceResolver resourceResolver = request.getResourceResolver();
        final BrowsePagePredicate browsePagePredicate = request.adaptTo(BrowsePagePredicate.class);

        final PredicateGroup predicates;

        if (querySearchPreProcessor != null) {
            predicates = querySearchPreProcessor.process(request, browsePagePredicate.getParams());
        } else {
            predicates = PredicateGroup.create(browsePagePredicate.getParams());
        }

        if (!searchSafety.isSafe(request.getResourceResolver(), predicates)) {
            throw new UnsafeSearchException("Search query will initiate an traversing query");
        }

        final Query query = queryBuilder.createQuery(predicates, resourceResolver.adaptTo(Session.class));
        final SearchResult searchResult = query.getResult();

        final List<Result> results = new ArrayList<>();

        if (predicates.getParameters().get(Predicate.PARAM_OFFSET) == null || "0".equals(predicates.get(Predicate.PARAM_OFFSET))) {
            // Is the first "page" of search results
            results.addAll(getFolderResults(request, getFolderPaths(request, browsePagePredicate)));
        }

        for (final Hit hit : searchResult.getHits()) {
            try {
                final Result result = modelFactory.getModelFromWrappedRequest(request,
                        resourceResolver.getResource(hit.getPath()), AssetResult.class);

                if (result != null) {
                    results.add(result);
                }
            } catch (RepositoryException e) {
                log.error("Could not retrieve search result", e);
            }
        }

        final BrowseResultsImpl resultsImpl = new BrowseResultsImpl(results, searchResult, browsePagePredicate.getParamPath());

        if (querySearchPostProcessor != null) {
            return querySearchPostProcessor.process(request, query, resultsImpl, searchResult);
        } else {
            return resultsImpl;
        }
    }

    protected Collection<String> getFolderPaths(SlingHttpServletRequest request, BrowsePagePredicate browsePagePredicate) {
        final ResourceResolver resourceResolver = request.getResourceResolver();
        final String paramPath = browsePagePredicate.getParamPath();

        if (paramPath != null) {
            // if QueryParam Path exists, get its child folders to display
            return getChildFolderPaths(resourceResolver.getResource(paramPath), request.getParameter("fulltext"));
        } else {
            // Use the pagePredicate paths
            List<String> pagePredicatePaths = browsePagePredicate.getPaths();

            if (pagePredicatePaths.size() == 1) {
                // If only 1 page predicate path, then search with it
                return getChildFolderPaths(resourceResolver.getResource(pagePredicatePaths.get(0)), request.getParameter("fulltext"));
            } else {
                // If more than 1 page predicate path then just show those folders.
                return pagePredicatePaths;
            }
        }
    }

    protected Collection<String> getChildFolderPaths(Resource parentResource, String fulltext) {
        final ResourceResolver resourceResolver = parentResource.getResourceResolver();

        final Map<String, String> params = new HashMap<>();
        params.put("type", JcrConstants.NT_FOLDER);
        params.put("property", JcrConstants.JCR_PRIMARYTYPE);
        params.put("property.1_value", JcrConstants.NT_FOLDER);
        params.put("property.2_value", JcrResourceConstants.NT_SLING_FOLDER);
        params.put("property.3_value", JcrResourceConstants.NT_SLING_ORDERED_FOLDER);
        params.put("path.path", parentResource.getPath());
        params.put("path.flat", "true");

        if (StringUtils.isNotBlank(fulltext)) {
            params.put("fulltext", fulltext);
        }

        final Query query = queryBuilder.createQuery(PredicateGroup.create(params), resourceResolver.adaptTo(Session.class));
        final List<String> paths = query.getResult().getHits().stream().map(hit -> {
            try {
                return resourceResolver.getResource(hit.getPath());
            } catch (RepositoryException e) {
                log.error("Unable to collect folder search result from respository", e);
                return null;
            }
        }).filter(Objects::nonNull).map(resource -> resource.getPath()).distinct().collect(Collectors.toList());

        return paths;
    }


    protected List<Result> getFolderResults(SlingHttpServletRequest request, Collection<String> paths) {
        List<Result> folders = new ArrayList<>();
        for (String path : paths) {
            FolderResult result = modelFactory.getModelFromWrappedRequest(request, request.getResourceResolver().getResource(path), FolderResult.class);
            if (result != null) {
                folders.add(result);
            }
        }
        return folders;
    }


    protected boolean isFolder(Resource resource) {
        return resource != null && (
                resource.isResourceType(JcrResourceConstants.NT_SLING_FOLDER) ||
                        resource.isResourceType(JcrResourceConstants.NT_SLING_ORDERED_FOLDER) ||
                        resource.isResourceType(JcrConstants.NT_FOLDER));
    }

    private class ComparableFolder implements Comparator<Resource> {

        @Override
        public int compare(final Resource a, final Resource b) {
            final ValueMap aProperties = a.getValueMap();
            final ValueMap bProperties = b.getValueMap();

            final String aTitle = StringUtils.lowerCase(a.getValueMap().get("jcr:content/jcr:title", a.getValueMap().get("jcr:title", a.getName())));
            final String bTitle = StringUtils.lowerCase(bProperties.get("jcr:content/jcr:title", bProperties.get("jcr:title", a.getName())));

            return aTitle.compareTo(bTitle);
        }
    }
}