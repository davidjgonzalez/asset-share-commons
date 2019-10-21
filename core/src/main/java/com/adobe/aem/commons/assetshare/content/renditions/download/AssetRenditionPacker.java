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
     * This method collects and packs the asset renditions into a single file output stream, normally a ZIP file.
     *
     * @param request the sling request
     * @param response the sling response
     * @param assets the assets whose renditions should be collected
     * @param renditionNames the renditions to collect
     *
     * @throws AssetRenditionException if the asset renditions cannot be collected and packed.
     * @return a byte output stream of the packed asset renditions.
     */
    ByteArrayOutputStream pack(final SlingHttpServletRequest request,
                               final SlingHttpServletResponse response,
                               final List<AssetModel> assets,
                               final List<String> renditionNames) throws AssetRenditionException;
}
