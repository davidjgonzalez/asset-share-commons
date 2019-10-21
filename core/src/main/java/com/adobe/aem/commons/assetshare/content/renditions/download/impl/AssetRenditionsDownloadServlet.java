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
import com.adobe.aem.commons.assetshare.content.renditions.download.AssetRenditionException;
import com.adobe.aem.commons.assetshare.content.renditions.download.AssetRenditionPacker;
import com.adobe.aem.commons.assetshare.util.ServletHelper;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.request.RequestParameter;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.models.factory.ModelFactory;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static java.util.Collections.EMPTY_LIST;

@Component(
        service = Servlet.class,
        property = {
                "sling.servlet.methods=GET",
                "sling.servlet.resourceTypes=asset-share-commons/actions/download",
                "sling.servlet.selectors=download",
                "sling.servlet.extensions=zip"
        }
)
public class AssetRenditionsDownloadServlet extends SlingSafeMethodsServlet {
    private static final Logger log = LoggerFactory.getLogger(AssetRenditionsDownloadServlet.class);

    private static final String DEFAULT_FILE_ATTACHMENT_NAME = "Assets.zip";
    private static final String REQ_KEY_ASSET_PATHS = "path";
    private static final String REQ_KEY_RENDITION_NAMES = "renditionName";
    private static final String PN_ALLOWED_RENDITION_NAMES = "allowedRenditionNames";

    @Reference
    private ServletHelper servletHelper;

    @Reference
    private ModelFactory modelFactory;

    @Reference
    private AssetRenditionPacker assetRenditionPacker;

    @Override
    protected final void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        servletHelper.addSlingBindings(request, response);

        final List<String> renditionNames = getRenditionNames(request);
        final List<AssetModel> assets = getAssets(request);

        if (renditionNames.isEmpty() || assets.isEmpty()) {
            log.debug("Invalid request. Either path or assetRendition is empty.");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        final String filename = StringUtils.defaultIfBlank(assetRenditionPacker.getFileName(), DEFAULT_FILE_ATTACHMENT_NAME);

        ByteArrayOutputStream packedStream = null;
        try {
            packedStream = assetRenditionPacker.pack(request, response, assets, renditionNames);

            response.setHeader("Content-Disposition", "attachment; filename=\"" + filename + "\"");
            response.setContentType("application/zip");
            response.setContentLength(packedStream.size());

            IOUtils.write(packedStream.toByteArray(), response.getOutputStream());
            response.getOutputStream().flush();
        } catch (AssetRenditionException e) {
            throw new ServletException(e);
        } finally {
            if (packedStream != null) {
                packedStream.close();
            }
        }
    }

    private List<AssetModel> getAssets(final SlingHttpServletRequest request) {
        final RequestParameter[] requestParameters = request.getRequestParameters(REQ_KEY_ASSET_PATHS);

        if (requestParameters == null) { return EMPTY_LIST; }

        return Arrays.stream(requestParameters)
                .map(RequestParameter::getString)
                .map(path -> request.getResourceResolver().getResource(path))
                .filter(Objects::nonNull)
                .map(resource -> modelFactory.getModelFromWrappedRequest(request, resource, AssetModel.class))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    private List<String> getRenditionNames(final SlingHttpServletRequest request) {
        final String[] allowedRenditionNames = request.getResource().getValueMap().get(PN_ALLOWED_RENDITION_NAMES, new String[]{});

        if (allowedRenditionNames == null) { return EMPTY_LIST; }

        final RequestParameter[] requestParameters = request.getRequestParameters(REQ_KEY_RENDITION_NAMES);
        return Arrays.stream(requestParameters).map(RequestParameter::getString)
                .filter(renditionName -> allowedRenditionNames.length == 0 || ArrayUtils.contains(allowedRenditionNames, renditionName))
                .collect(Collectors.toList());
    }


    /*
    private void zip(final SlingHttpServletRequest request,
                     final SlingHttpServletResponse response,
                     final List<String> assetPaths,
                     final List<String> renditionNames) throws IOException {

        final ResourceResolver resourceResolver = request.getResourceResolver();
        final ByteArrayOutputStream baos = new ByteArrayOutputStream();
        final ZipOutputStream zipOutputStream = new ZipOutputStream(baos);

        long size = 0L;

        for (final String assetPath : assetPaths) {
            //    final Asset asset = DamUtil.resolveToAsset(resourceResolver.getResource(path));
            final Resource assetResource = resourceResolver.getResource(assetPath);

            if (assetResource == null) {
                log.warn("Could not create an AssetModel from [ {} ]", assetPath);
                continue;
            }

            final AssetModel asset = modelFactory.getModelFromWrappedRequest(request, assetResource, AssetModel.class);

            for (final String renditionName : renditionNames) {

                AssetRenditionDownloadResponse assetRenditionDownloadResponse = null;
                ByteArrayOutputStream assetRenditionOutputStream = null;

                try {
                    assetRenditionDownloadResponse = getAssetRendition(request, response, asset, renditionName);

                    if (assetRenditionDownloadResponse.getStatusCode() > 302) {
                        log.warn("Response of [ {} ] from dispatched response is unacceptable. Skip adding [ {} ] to zip.",
                                assetRenditionDownloadResponse.getStatusCode(), asset.getPath());
                    }  else if (assetRenditionDownloadResponse.isRedirect()) {
                        assetRenditionOutputStream = fetchExternalRendition(assetRenditionDownloadResponse.getRedirect());
                    } else {
                        assetRenditionOutputStream = assetRenditionDownloadResponse.getByteArrayOutputStream();
                    }

                    size += assetRenditionOutputStream.size();
                    if (size > cfg.max_size() * BYTES_IN_MB) {
                        throw new ServletException("Selected assets exceed maximum allows size");
                    }

                    addAssetRenditionAsZipEntry(getZipEntryName(asset, renditionName, assetRenditionDownloadResponse.getContentType()),
                            zipOutputStream,
                            assetRenditionOutputStream);
                } catch (ServletException e) {
                    log.error("Unable to add rendition [ {} ] for asset [ {} ] to the zip", renditionName, asset.getPath(), e);
                } finally {
                    if (baos != null) {
                        baos.close();
                    }
                }
            } // for renditionNames
        } // for assetPaths


        try {
            zipOutputStream.close();
            response.setContentLength(baos.size());
            IOUtils.write(baos.toByteArray(), response.getOutputStream());
            response.flushBuffer();
        } catch (
                Exception e) {
            log.error("what thee heck", e);
        } finally {
            baos.close();
        }
    }
    */

}
