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

package com.adobe.aem.commons.assetshare.content.renditions.download.impl;

import com.adobe.aem.commons.assetshare.content.AssetModel;
import com.adobe.aem.commons.assetshare.content.renditions.download.AssetRenditionPacker;
import com.adobe.aem.commons.assetshare.content.renditions.download.AssetRenditionStreamer;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.commons.mime.MimeTypeService;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Component
@Designate(ocd = AssetRenditionZipperImpl.Cfg.class)
public class AssetRenditionZipperImpl implements AssetRenditionPacker {
    private static final Logger log = LoggerFactory.getLogger(AssetRenditionZipperImpl.class);

    private static final long BYTES_IN_MB = 1024;

    public static final String VAR_ASSET_NAME = "${asset.filename}";
    public static final String VAR_ASSET_EXTENSION = "${asset.extension}";
    public static final String VAR_RENDITION_NAME = "${rendition.filename}";
    public static final String VAR_RENDITION_EXTENSION = "${rendition.extension}";
    public static final String VAR_ASSET_FILE_NAME = "${asset.filename}";
    public static final String VAR_ASSET_TITLE = "${asset.title}";

    @Reference
    private AssetRenditionStreamer assetRenditionStreamer;

    @Reference
    private MimeTypeService mimeTypeService;

    private Cfg cfg;

    @Override
    public String getFileName() {
        return StringUtils.defaultString(cfg.file_name(), "Assets.zip");
    }

    @Override
    public ByteArrayOutputStream pack(final SlingHttpServletRequest request,
                                      final SlingHttpServletResponse response,
                                      final List<AssetModel> assets,
                                      final List<String> renditionNames) throws IOException, AssetRenditionException {

        final ByteArrayOutputStream zipBaos = new ByteArrayOutputStream();
        final ZipOutputStream zipOutputStream = new ZipOutputStream(zipBaos);

        final boolean groupAssetRenditionsByFolder = true;

        long size = 0L;

        for (final AssetModel asset : assets) {
            String folderName = "";

            if (groupAssetRenditionsByFolder) {
                folderName = asset.getName() + "/";
                addFolderAsZipEntry(folderName, zipOutputStream);
            }

            for (final String renditionName : renditionNames) {

                AssetRenditionStreamer.AssetRenditionStream stream = null;
                try {
                    stream = assetRenditionStreamer.getAssetRendition(request, response, asset, renditionName);

                    size += stream.getOutputStream().size();

                    checkForMaxSize(size);

                    final String zipEntryName = getZipEntryName(asset, renditionName, stream.getContentType());
                    addAssetRenditionAsZipEntry(folderName, zipEntryName, zipOutputStream, stream.getOutputStream());

                } catch (AssetRenditionException ex) {
                    log.error("Unable to obtain the AssetRendition as an output stream. Skipping...", ex);
                    continue;
                } finally {
                    if (stream != null && stream.getOutputStream() != null) {
                        stream.getOutputStream().close();
                    }
                }
            }
        }

        zipOutputStream.close();

        return zipBaos;
    }

    private void checkForMaxSize(long size) throws AssetRenditionException {
        if (cfg.max_size() >= 0 && size > cfg.max_size() * BYTES_IN_MB) {
            throw new AssetRenditionException("Selected assets exceed maximum allows size.");
        }
    }

    private String getZipEntryName(final AssetModel asset, final String renditionName, final String responseContentType) {
        log.error(">>>>> " + responseContentType);
        final String extension = mimeTypeService.getExtension(responseContentType);
        log.error("!!!!!! " + extension);

        final Map<String, String> variables = new HashMap<>();
        variables.put(VAR_ASSET_FILE_NAME, asset.getName());
        variables.put(VAR_ASSET_NAME, StringUtils.substringBeforeLast(asset.getName(), "."));
        variables.put(VAR_ASSET_TITLE, asset.getTitle());
        variables.put(VAR_ASSET_EXTENSION, StringUtils.substringAfterLast(asset.getName(), "."));
        variables.put(VAR_RENDITION_NAME, renditionName);
        variables.put(VAR_RENDITION_EXTENSION, extension);

        return StringUtils.replaceEach(cfg.rendition_filename_expression(),
                variables.keySet().toArray(new String[variables.keySet().size()]),
                variables.values().toArray(new String[variables.values().size()]));
    }


    private void addFolderAsZipEntry(final String folderName,
                                             final ZipOutputStream zipOutputStream) throws IOException {

        final ZipEntry zipEntry = new ZipEntry(folderName);
        zipOutputStream.putNextEntry(zipEntry);
    }

    private void addAssetRenditionAsZipEntry(final String prefix,
                                             final String zipEntryName,
                                             final ZipOutputStream zipOutputStream,
                                             final ByteArrayOutputStream assetRenditionOutputStream) throws IOException {

        final ZipEntry zipEntry = new ZipEntry(prefix + zipEntryName);
        zipOutputStream.putNextEntry(zipEntry);
        IOUtils.write(assetRenditionOutputStream.toByteArray(), zipOutputStream);
        zipOutputStream.closeEntry();
        assetRenditionOutputStream.close();
    }


    @Activate
    protected void activate(final AssetRenditionZipperImpl.Cfg cfg) {
        this.cfg = cfg;
    }

    @ObjectClassDefinition(name = "Asset Share Commons - Asset Rendition Zipper")
    public @interface Cfg {
        @AttributeDefinition
        String webconsole_configurationFactory_nameHint() default "{zip_filename_expression} with max size in MB {max.size}";

        @AttributeDefinition(
                name = "Filename of packed asset renditions",
                description = ""
        )
        String file_name() default "Assets.zip";

        @AttributeDefinition(
                name = "Max Size (in MB)",
                description = "The max size (in MB; 1024 bytes) of source (pre-zipped) files allowed to be zipped.."
        )
        long max_size() default -1L;


        @AttributeDefinition(
                name = "Rendition Filename Format",
                description = ""
        )
        String rendition_filename_expression() default "${asset.filename}__${rendition.filename}.${rendition.extension}";
    }
}
