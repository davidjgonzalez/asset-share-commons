/*
 * Asset Share Commons
 *
 * Copyright (C) 2019 Adobe
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

package com.adobe.aem.commons.assetshare.components.actions.download.impl;

import com.adobe.aem.commons.assetshare.components.actions.ActionHelper;
import com.adobe.aem.commons.assetshare.components.actions.AssetDownloadHelper;
import com.adobe.aem.commons.assetshare.components.actions.download.Download;
import com.adobe.aem.commons.assetshare.components.actions.download.DownloadV2;
import com.adobe.aem.commons.assetshare.components.details.impl.RenditionsImpl;
import com.adobe.aem.commons.assetshare.content.AssetModel;
import com.adobe.aem.commons.assetshare.content.Rendition;
import com.adobe.aem.commons.assetshare.content.properties.impl.LicenseImpl;
import com.adobe.cq.wcm.core.components.models.form.OptionItem;
import com.adobe.cq.wcm.core.components.models.form.Options;
import com.day.cq.dam.commons.util.UIHelper;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.Required;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Model(
        adaptables = {SlingHttpServletRequest.class},
        adapters = {DownloadV2.class},
        resourceType = {DownloadV2Impl.RESOURCE_TYPE}
)
public class DownloadV2Impl implements DownloadV2 {
	
    protected static final String RESOURCE_TYPE = "asset-share-commons/components/modals/download";
    private static final Logger log = LoggerFactory.getLogger(DownloadV2Impl.class);
    private static final long DEFAULT_SIZE_LIMIT = -1L;

    @Self
    @Required
    protected SlingHttpServletRequest request;

    @Self
    @Required
    private Options coreOptions;

    @ValueMapValue
    @Optional
    @Default(values = "Assets")
    protected String zipFileName;

    @ValueMapValue
    @Optional
    protected List<String> allowedRenditionNames;

    @OSGiService
    @Required
    protected ActionHelper actionHelper;

    @OSGiService
    @Required
    protected AssetDownloadHelper assetDownloadHelper;

    protected Collection<AssetModel> assets = new ArrayList<>();
    private Collection<Options> renditions = new ArrayList<>();

    @PostConstruct
    protected void init() {
        coreOptions = request.adaptTo(Options.class);
        assets = actionHelper.getAssetsFromQueryParameter(request, "path");
    }

    public Collection<AssetModel> getAssets() {
        return assets;
    }

    public String getZipFileName() {
        return StringUtils.removeEndIgnoreCase(zipFileName, ".zip");
    }

    public Collection<OptionItem> getRenditions() {
        return coreOptions.getItems();
    }

}