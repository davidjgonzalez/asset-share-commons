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

import com.adobe.aem.commons.assetshare.components.predicates.AbstractPredicate;
import com.adobe.aem.commons.assetshare.components.predicates.BrowsePagePredicate;
import com.adobe.aem.commons.assetshare.components.predicates.BrowsePath;
import com.adobe.aem.commons.assetshare.search.results.FolderResult;
import com.adobe.cq.wcm.core.components.models.form.Options;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Required;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.factory.ModelFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Model(
        adaptables = {SlingHttpServletRequest.class},
        adapters = {BrowsePath.class},
        resourceType = {BrowsePathPredicateImpl.RESOURCE_TYPE}
)
public class BrowsePathPredicateImpl extends AbstractPredicate implements BrowsePath {
    private static final Logger log = LoggerFactory.getLogger(BrowsePathPredicateImpl.class);

    protected static final String RESOURCE_TYPE = "asset-share-commons/components/search/browse-path";

    @Self
    @Required
    private SlingHttpServletRequest request;

    @Self
    @Required
    private Options coreOptions;

    @Self
    @Required
    private BrowsePagePredicate browsePagePredicate;

    @OSGiService
    @Required
    private ModelFactory modelFactory;

    private Resource browseResource;

    private List<Folder> folders;

    @PostConstruct
    protected void init() {
        initPredicate(request, coreOptions);
    }

    public List<Folder> getFolders() {
        if (folders == null) {
            final List<Folder> folders = new ArrayList<>();

            Resource current = getCurrentBrowseResource();

            while (current != null) {
                if (browsePagePredicate.isAllowedPath(current.getPath())) {
                    try {
                        folders.add(new FolderImpl(current));
                    } catch (IllegalArgumentException e) {
                        log.error("Unable to collect browse folder segment.", e);
                    }

                    current = current.getParent();
                } else {
                    current = null;
                }
            }

            Collections.reverse(folders);

            this.folders = folders;
        }

        return folders;
    }

    @Override
    public boolean isMultipleRoots() {
        return browsePagePredicate.getAllowedPaths().size() > 1;
    }

    @Override
    public String getName() {
        return "path";
    }

    @Override
    public boolean isReady() {
        return true;
    }

    private Resource getCurrentBrowseResource() {
        if (browseResource == null) {
            String path = browsePagePredicate.getParamPath();

            if (!browsePagePredicate.isAllowedPath(path)) {
                path = browsePagePredicate.getBrowseRootPath();
            }

            if (StringUtils.isNotBlank(path)) {
                final Resource resource = request.getResourceResolver().getResource(path);
                if (resource != null) {
                    browseResource = resource;
                }
            }
        }

        return browseResource;
    }

    public final class FolderImpl implements Folder {
        private String title;
        private String path;

        public FolderImpl(Resource resource) {
            final FolderResult folderResult = modelFactory.getModelFromWrappedRequest(request, resource, FolderResult.class);

            if (folderResult == null) {
                throw new IllegalArgumentException(String.format("Unable to adapt resource [ %s ] to a FolderResult", resource.getPath()));
            }

            title = StringUtils.defaultString(folderResult.getTitle(), folderResult.getName());
            path = folderResult.getPath();
        }

        public String getTitle() {
            return title;
        }

        public String getPath() {
            return path;
        }
    }
}
