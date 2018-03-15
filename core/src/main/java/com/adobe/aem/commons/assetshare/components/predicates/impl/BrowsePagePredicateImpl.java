/*
 * Asset Share Commons
 *
 * Copyright (C) 2017 Adobe
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

package com.adobe.aem.commons.assetshare.components.predicates.impl;

import com.adobe.aem.commons.assetshare.components.predicates.BrowsePagePredicate;
import com.adobe.aem.commons.assetshare.components.predicates.HiddenPredicate;
import com.adobe.aem.commons.assetshare.util.PredicateUtil;
import com.day.cq.dam.api.DamConstants;
import com.day.cq.search.Predicate;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.request.RequestParameter;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Model(
        adaptables = {SlingHttpServletRequest.class},
        adapters = {BrowsePagePredicate.class},
        resourceType = {BrowsePagePredicateImpl.RESOURCE_TYPE},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        cache = true
)
public class BrowsePagePredicateImpl extends PagePredicateImpl implements BrowsePagePredicate {
    protected static final String RESOURCE_TYPE = "asset-share-commons/components/search/results";

    @Self
    private SlingHttpServletRequest request;

    private String paramPath = null;

    private Collection<String> searchPaths = null;

    @Override
    public List<String> getAllowedPaths() {
        return super.getPaths();
    }

    @Override
    public Map<String, String> getParams() {
        Map<String, String> params = new HashMap<>();

        for (final Map.Entry<String, RequestParameter[]> entry : request.getRequestParameterMap().entrySet()) {
            params.put(entry.getKey(), entry.getValue()[0].getString());
        }

        int groupId = Integer.MAX_VALUE - 100000000;

        int i = 1;

        // Paths
        params.remove("path");

        final String pathGroup = String.valueOf(groupId--) + "_group";

        final Collection<String> paths = getSearchPaths();
        params.put(pathGroup + ".p.or", "true");
        for (final String path : paths) {
            params.put(pathGroup + "." + i + "_path.path", path);
            params.put(pathGroup + "." + i + "_path.flat", "true");
            i++;
        }

        params.put("type", DamConstants.NT_DAM_ASSET);

        // Start large to avoid any conflicts w parameterized
        for (final HiddenPredicate hiddenPredicate : getHiddenPredicates(getCurrentPage())) {
            params.putAll(hiddenPredicate.getParams(groupId--));
        }

        // If not provided, use the defaults set on the Search Component resource
        if (params.get(Predicate.ORDER_BY) == null) {
            params.put(Predicate.ORDER_BY, getOrderBy());
        }

        if (params.get(Predicate.ORDER_BY + "." + Predicate.PARAM_SORT) == null) {
            params.put(Predicate.ORDER_BY + "." + Predicate.PARAM_SORT, getOrderBySort());
        }

        return params;
    }

    @Override
    public String getBrowseRootPath() {
        Collection<String> browsePaths = getSearchPaths();
        if (browsePaths.size() == 1) {
            return browsePaths.iterator().next();
        } else {
            return null;
        }
    }

    public String getParamPath() {
        if (paramPath == null) {
            final String path = StringUtils.stripToNull(PredicateUtil.getParamFromQueryParams(request,"path"));

           if (isAllowedPath(path)) {
               paramPath = path;
           }
        }

        return paramPath;
    }

    public Collection<String> getSearchPaths() {
        if (searchPaths == null) {
            final String paramPath = getParamPath();
            final Set<String> paths = new HashSet<>();

            if (paramPath != null) {
                // if QueryParam Path exists, get its child folders to display
                paths.add(paramPath);
                searchPaths = paths;
            } else {
                // Use the pagePredicate paths
                final List<String> allowedPaths = getAllowedPaths();

                if (allowedPaths.size() == 1) {
                    // If only 1 page predicate path, then search with it
                    paths.add(allowedPaths.get(0));
                    searchPaths = paths;
                } else {
                    // If more than 1 page predicate path then just show those folders.
                    searchPaths = allowedPaths;
                }
            }
        }

        return searchPaths;
    }

    public boolean isAllowedPath(final String path) {
        return getAllowedPaths().stream()
                .anyMatch(allowedPath -> StringUtils.equals(path, allowedPath) || StringUtils.startsWith(path, allowedPath + "/"));
    }
}