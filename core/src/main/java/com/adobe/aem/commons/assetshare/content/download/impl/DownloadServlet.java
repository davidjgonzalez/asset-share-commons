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

package com.adobe.aem.commons.assetshare.content.download.impl;

import com.adobe.aem.commons.assetshare.content.AssetModel;
import com.adobe.aem.commons.assetshare.content.renditions.AssetRenditionDispatcher;
import com.adobe.aem.commons.assetshare.content.renditions.AssetRenditionParameters;
import com.adobe.aem.commons.assetshare.content.renditions.AssetRenditions;
import com.adobe.aem.commons.assetshare.content.renditions.impl.AssetRenditionServlet;
import com.adobe.aem.commons.assetshare.util.ServletHelper;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.osgi.services.HttpClientBuilderFactory;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.models.factory.ModelFactory;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.StringWriter;
import java.util.Arrays;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;


@Component(
        service = Servlet.class,
        property = {
                "sling.servlet.methods=GET",
                "sling.servlet.resourceTypes=asset-share-commons/actions/download",
                "sling.servlet.selectors=dl",
                "sling.servlet.extensions=zip"
        }
)
public class DownloadServlet extends SlingSafeMethodsServlet {
    private static final Logger log = LoggerFactory.getLogger(DownloadServlet.class);

    @Reference
    private ServletHelper servletHelper;

    @Reference
    private HttpClientBuilderFactory clientBuilderFactory;

    @Reference
    private ModelFactory modelFactory;

    @Reference
    private AssetRenditions assetRenditions;

    @Override
    protected final void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        servletHelper.addSlingBindings(request, response);

        List<String> renditionNames = Arrays.asList("web", "original", "ext");
        List<String> assetPaths = Arrays.asList("/content/dam/asset-share-commons/en/public/pictures/adam-birkett-191377.jpg",
                "/content/dam/asset-share-commons/en/public/pictures/josh-nuttall-271928.jpg",
                "/content/dam/asset-share-commons/en/public/pictures/ruslan-bardash-351288.jpg");

        String filename = "assets.zip";

        response.setHeader("Content-Disposition", "attachment; filename=\"" + filename + "\"");
        response.setContentType("application/zip");

        zip(request, response, assetPaths, renditionNames);

        response.getOutputStream().flush();
        // the response variable is just a standard HttpServletResponse
    }

    private void zip(SlingHttpServletRequest request,
                     SlingHttpServletResponse response,
                     List<String> assetPaths,
                     List<String> renditionNames) throws IOException {

        final ResourceResolver resourceResolver = request.getResourceResolver();
        final ByteArrayOutputStream baos = new ByteArrayOutputStream();
        final ZipOutputStream zipOutputStream = new ZipOutputStream(baos);

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

                    if (assetRenditionDownloadResponse.isRedirect()) {
                        assetRenditionOutputStream = fetchExternalRendition(assetRenditionDownloadResponse.getRedirect());
                    } else {
                        assetRenditionOutputStream = assetRenditionDownloadResponse.getByteArrayOutputStream();
                    }

                    addAssetRenditionAsZipEntry(getZipEntryName(asset, renditionName), zipOutputStream, assetRenditionOutputStream);

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

    private String getZipEntryName(AssetModel asset, String renditionName) {
        String fileName = asset.getName();
        String extension = StringUtils.substringAfterLast(fileName, ".");
        String name = StringUtils.substringBeforeLast(fileName, ".");

        return name + " (" + renditionName + ")." + extension;
    }

    private ByteArrayOutputStream fetchExternalRendition(String uri) throws IOException {

        final HttpGet get = new HttpGet(uri);

        try (CloseableHttpClient httpClient = getHttpClient(100000)) {
            final CloseableHttpResponse response = httpClient.execute(get);

            final ByteArrayOutputStream baos = new ByteArrayOutputStream();

            IOUtils.copy(response.getEntity().getContent(), baos);

            response.close();

            return baos;
        }
    }

    protected boolean acceptedByAssetRenditionDispatcher(final AssetRenditionDispatcher assetRenditionDispatcher, final AssetRenditionParameters parameters) {
        if (assetRenditionDispatcher.getRenditionNames() == null ||
                assetRenditions == null ||
                StringUtils.isBlank(parameters.getRenditionName())) {
            return false;
        } else {
            return assetRenditionDispatcher.getRenditionNames().contains(parameters.getRenditionName());
        }
    }


    private AssetRenditionDownloadResponse getAssetRendition(final SlingHttpServletRequest realRequest,
                                                             final SlingHttpServletResponse realResponse,
                                                             final AssetModel asset,
                                                             final String renditionName) throws IOException, ServletException {

        final AssetRenditionDownloadRequest assetRenditionRequest = new AssetRenditionDownloadRequest(
                realRequest,
                HttpGet.METHOD_NAME,
                asset.getResource(),
                ArrayUtils.EMPTY_STRING_ARRAY,
                AssetRenditionServlet.SERVLET_EXTENSION,
                "/" + renditionName + "/" + AssetRenditionParameters.CACHE_FILENAME);

        final AssetRenditionDownloadResponse assetRenditionResponse = new AssetRenditionDownloadResponse(
                realResponse,
                new StringWriter(),
                new ByteArrayOutputStream());

        for (final AssetRenditionDispatcher assetRenditionDispatcher : assetRenditions.getAssetRenditionDispatchers()) {
            if (acceptedByAssetRenditionDispatcher(assetRenditionDispatcher, new AssetRenditionParameters(assetRenditionRequest))) {
                assetRenditionDispatcher.dispatch(assetRenditionRequest, assetRenditionResponse);
                break;
            }
        }

        return assetRenditionResponse;
    }


    private void addAssetRenditionAsZipEntry(final String zipEntryName,
                                             final ZipOutputStream zipOutputStream,
                                             final ByteArrayOutputStream assetRenditionOutputStream) throws IOException {

        final ZipEntry zipEntry = new ZipEntry(zipEntryName);

        zipOutputStream.putNextEntry(zipEntry);

        IOUtils.write(assetRenditionOutputStream.toByteArray(), zipOutputStream);

        zipOutputStream.closeEntry();

        assetRenditionOutputStream.close();
    }


    private CloseableHttpClient getHttpClient(int timeoutInMilliSeconds) {
        RequestConfig requestConfig = RequestConfig.copy(RequestConfig.DEFAULT)
                .setSocketTimeout(timeoutInMilliSeconds)
                .setConnectTimeout(timeoutInMilliSeconds)
                .setConnectionRequestTimeout(timeoutInMilliSeconds)
                .build();
        return clientBuilderFactory.newBuilder().setDefaultRequestConfig(requestConfig).build();
    }
}
