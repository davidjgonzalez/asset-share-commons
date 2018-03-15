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

package com.adobe.aem.commons.assetshare.search.providers;

import com.adobe.aem.commons.assetshare.search.UnsafeSearchException;
import com.adobe.aem.commons.assetshare.search.results.Results;
import org.apache.sling.api.SlingHttpServletRequest;
import org.osgi.annotation.versioning.ConsumerType;

import javax.jcr.RepositoryException;

@ConsumerType
public interface SearchProvider {
    String SEARCH_PROVIDER_ID = "spid";

    /**
     * @return the Id for this search provider. This should be unique across all search providers.
     */
    String getId();

    /**
     * Method used to determine if the SearchProvider should handle the request.
     *
     * @param request the Request object for the search request.
     * @return true if this SearchProvider should service the request.
     */
    boolean accepts(SlingHttpServletRequest request);

    /**
     * Method responsible for returning search results.
     *
     * @param request the Request object for the search request.
     * @return the results from the search.
     * @throws UnsafeSearchException is thrown when a search is considered unsafe and may adversely impact AEMs performance.
     * @throws RepositoryException is thrown when there is an issue collecting search results from the AEM repository.
     */
    Results getResults(SlingHttpServletRequest request) throws UnsafeSearchException, RepositoryException;
}
