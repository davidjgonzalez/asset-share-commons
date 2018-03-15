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

package com.adobe.aem.commons.assetshare.search.results.impl.results;

import com.adobe.aem.commons.assetshare.search.results.Result;
import com.adobe.aem.commons.assetshare.search.results.Results;
import com.day.cq.search.facets.Facet;
import com.day.cq.search.result.SearchResult;
import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.resource.ValueMap;

import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * This is the Results object wrapper that represents results from a Browse search.
 * This extends normal QueryBuilderResults by adding the extra data-point "browsePath" to the AdditionalData Map.
 */
public class BrowseResultsImpl extends QueryBuilderResultsImpl implements Results {

    private List<Result> results;

    public BrowseResultsImpl(List<Result> results,
                             SearchResult searchResult,
                             String path)  {

        super(results, searchResult);
        this.results = results;

        if (StringUtils.isNotBlank(path)) {
            this.getAdditionalData().put("browsePath", path);
        }
    }

    public boolean hasNoResults() {
        return super.hasNoResults() && results.size() == 0;
    }
}
