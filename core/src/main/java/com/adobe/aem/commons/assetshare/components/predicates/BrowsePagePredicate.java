package com.adobe.aem.commons.assetshare.components.predicates;

import org.osgi.annotation.versioning.ProviderType;

import java.util.List;

@ProviderType
public interface BrowsePagePredicate extends PagePredicate {

    /**
     * @param path the path to check.
     * @return true if the path is an allowed path to search over.
     */
    boolean isAllowedPath(String path);

    /**
     * @return a list of allowed path prefixes.
     */
    List<String> getAllowedPaths();

    /**
     *
     * @return the browse root path; This is only populated if a single search root path is enabled.
     */
    String getBrowseRootPath();

    /**
     * @return the path provided by the `path` HTTP request query parameter.
     */
    String getParamPath();
}
