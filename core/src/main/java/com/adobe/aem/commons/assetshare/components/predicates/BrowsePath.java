package com.adobe.aem.commons.assetshare.components.predicates;

import org.osgi.annotation.versioning.ProviderType;

import java.util.List;

@ProviderType
public interface BrowsePath extends Predicate {
    /**
     * @return a list of browseable path segments.
     */
    List<Folder> getFolders();

    /**
     * @return true if this supports multiple roots via the Results component configuration.
     */
    boolean isMultipleRoots();

    /**
     * Interface for each browsable paths segment.
     */
    interface Folder {
        String getTitle();
        String getPath();
    }
}
