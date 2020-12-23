package com.adobe.aem.commons.assetshare.components.search;

import com.adobe.aem.commons.assetshare.components.Component;
import org.osgi.annotation.versioning.ProviderType;

/**
 * Sling Model for the Search Statistics Component.
 */
@ProviderType
public interface Statistics extends Component {
    /**
     * @return the component id; unique to this instance of the component.
     */
    String getId();

    String getRunningTotalLabel();

    String getTotalLabel();

    String getTimeTakenLabel();
    
    /**
     * @return the number of results returned so far.
     */
    long getRunningTotal();

    /**
     * @return the total number of results for this query (this may be a guess).
     */
    long getTotal();

    /**
     * @return true if there are more results to display for this search (using offset and limit)
     */
    boolean hasMore();


    /***
     * @return true to indicate the Time Taken should not be displayed
     */
    boolean isHideTimeTaken();

    /**
     * @return the time taken in milliseconds for this specific search. This is NOT an aggregate of all "loads" for this search.
     */
    long getTimeTaken();
}

