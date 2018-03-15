package com.adobe.aem.commons.assetshare.components.search;

import org.apache.sling.api.resource.ValueMap;
import org.osgi.annotation.versioning.ProviderType;

import java.util.List;

/**
 * Class that represents the overarching Search configuration that may span across components.
 *
 * These methods return the default values set by the Search Results component itself.
 */
@ProviderType
public interface SearchConfig {

    /**
     * @return a value map for the search results component.
     */
    ValueMap getProperties();

    /**
     * The mode derived from the request and if unavailable, then from the configured component state.
     *
     * @return the active search mode (ex. search, browse).
     */
    String getMode();

    /**
     * The layout derived from the request and if unavailable, then from the configured component state.
     *
     * @return the active layout mode (ex. card, list)
     */
    String getLayout();

    /**
     * @return a list of the paths that are eligible for searching.
     */
    List<String> getPaths();

    String getOrderBy();

    String getOrderBySort();

    int getLimit();

    /**
     * @return the configured Guess Total.
     */
    String getGuessTotal();

    /**
     * @return the default
     */
    String getSearchProviderId();
}