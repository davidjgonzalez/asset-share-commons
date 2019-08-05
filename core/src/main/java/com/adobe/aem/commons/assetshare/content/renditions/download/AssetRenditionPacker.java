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

package com.adobe.aem.commons.assetshare.content.renditions.download;

import com.adobe.aem.commons.assetshare.content.AssetModel;
import com.adobe.aem.commons.assetshare.content.renditions.download.impl.AssetRenditionException;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.osgi.annotation.versioning.ProviderType;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@ProviderType
public interface AssetRenditionPacker {
    /**
     * This is typically used to define the file_name that collects the packed asset renditions.
     *
     * @return the suggested file_name that contains the packed asset renditions.
     */
    String getFileName();

    /**
     * @param request
     * @param response
     * @param assets
     * @param renditionNames
     *
     * @return
     */
    ByteArrayOutputStream pack(SlingHttpServletRequest request, SlingHttpServletResponse response, List<AssetModel> assets, List<String> renditionNames) throws IOException, AssetRenditionException;
}
