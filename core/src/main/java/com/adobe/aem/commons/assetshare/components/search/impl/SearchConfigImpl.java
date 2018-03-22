package com.adobe.aem.commons.assetshare.components.search.impl;

import com.adobe.aem.commons.assetshare.components.predicates.PagePredicate;
import com.adobe.aem.commons.assetshare.components.search.SearchConfig;
import com.adobe.aem.commons.assetshare.util.ComponentModelVisitor;
import com.adobe.aem.commons.assetshare.util.ResourceTypeVisitor;
import com.day.cq.dam.api.DamConstants;
import com.day.cq.search.Predicate;
import com.day.cq.wcm.api.Page;
import com.day.text.Text;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.factory.ModelFactory;

import javax.annotation.PostConstruct;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Model(
        adaptables = {SlingHttpServletRequest.class},
        adapters = {SearchConfig.class},
        resourceType = {SearchConfigImpl.RESOURCE_TYPE},
        cache = true
)
public class SearchConfigImpl implements SearchConfig {
    public static final String RESOURCE_TYPE = "asset-share-commons/components/search/results";


    private static final int MAX_GUESS_TOTAL = 2000;
    private static final int DEFAULT_LIMIT = 50;

    private static final String DEFAULT_GUESS_TOTAL = "250";
    private static final String DEFAULT_ORDER_BY = "@jcr:score";
    private static final String DEFAULT_ORDER_BY_SORT = Predicate.SORT_DESCENDING;
    private static final String DEFAULT_LAYOUT = "card";
    private static final String DEFAULT_SPID = "search";

    private final String[] DEFAULT_PATHS = {"/content/dam"};

    private String PN_ORDER_BY = "orderBy";
    private String PN_ORDER_BY_SORT = "orderBySort";
    private String PN_LIMIT = Predicate.PARAM_LIMIT;
    private String PN_PATHS = "paths";
    private String PN_LAYOUT = "layout";
    private String PN_GUESS_TOTAL = Predicate.PARAM_GUESS_TOTAL;
    private String PN_SPID = "searchProviderId";

    @Self
    private SlingHttpServletRequest request;

    @ScriptVariable
    private Page currentPage;

    @SlingObject
    private Resource resource;

    @OSGiService
    private ModelFactory modelFactory;

    private ValueMap properties;

    List<String> paths;

    @PostConstruct
    protected void init() {
        if (!resource.isResourceType(RESOURCE_TYPE)) {

            final ResourceTypeVisitor visitor = new ResourceTypeVisitor(new String[]{RESOURCE_TYPE});
            visitor.accept(currentPage.getContentResource());

            if (visitor.getResources().size() > 0) {
                resource = visitor.getResources().iterator().next();
            }
        }

        properties = resource.getValueMap();
    }

    @Override
    public ValueMap getProperties() {
        return properties;
    }

    @Override
    public String getMode() {
        return properties.get(PN_SPID, DEFAULT_SPID);
    }

    @Override
    public String getLayout() {
        return properties.get(PN_LAYOUT, DEFAULT_LAYOUT);

    }
    @Override
    public String getGuessTotal() {
        final String guessTotal = properties.get(PN_GUESS_TOTAL, DEFAULT_GUESS_TOTAL);

        if ("true".equalsIgnoreCase(guessTotal)) {
            return guessTotal;
        } else {
            try {
                int tmp = Integer.parseInt(guessTotal);

                if (tmp < 1 || tmp > MAX_GUESS_TOTAL) {
                    return DEFAULT_GUESS_TOTAL;
                } else {
                    return String.valueOf(tmp);
                }
            } catch (NumberFormatException e) {
                return DEFAULT_GUESS_TOTAL;
            }
        }
    }

    @Override
    public String getSearchProviderId() {
        return properties.get(PN_SPID, DEFAULT_SPID);
    }

    @Override
    public int getLimit() {
        return properties.get(PN_LIMIT, DEFAULT_LIMIT);
    }

    @Override
    public String getOrderBy() {
        return properties.get(PN_ORDER_BY, DEFAULT_ORDER_BY);
    }

    @Override
    public String getOrderBySort() {
        return properties.get(PN_ORDER_BY_SORT, DEFAULT_ORDER_BY_SORT);
    }

    @Override
    public List<String> getPaths() {
        if (paths == null) {
            final List<String> acceptedPaths = Arrays.stream(properties.get(PN_PATHS, DEFAULT_PATHS))
                    // Text.fullPath(..) canonical-izes the path preventing trickery with ./ and ../
                    .map(uncheckedPath -> Text.fullPath("", uncheckedPath))
                    .filter(uncheckedPath ->  StringUtils.equals(uncheckedPath, DamConstants.MOUNTPOINT_ASSETS) ||
                            StringUtils.startsWith(uncheckedPath, DamConstants.MOUNTPOINT_ASSETS + "/"))
                    .collect(Collectors.toList());

            if (acceptedPaths.size() < 1) {
                paths = Arrays.asList(DEFAULT_PATHS);
            } else {
                paths = acceptedPaths;
            }
        }

        return paths;
    }
}