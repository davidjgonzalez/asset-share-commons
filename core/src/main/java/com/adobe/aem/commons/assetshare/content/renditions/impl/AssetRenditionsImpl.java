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

package com.adobe.aem.commons.assetshare.content.renditions.impl;

import com.adobe.aem.commons.assetshare.content.AssetModel;
import com.adobe.aem.commons.assetshare.content.renditions.AssetRenditionDispatcher;
import com.adobe.aem.commons.assetshare.content.renditions.AssetRenditionParameters;
import com.adobe.aem.commons.assetshare.content.renditions.AssetRenditions;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.commons.osgi.Order;
import org.apache.sling.commons.osgi.RankedServices;
import org.apache.sling.models.factory.ModelFactory;
import org.osgi.service.component.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static com.day.cq.dam.scene7.api.constants.Scene7Constants.*;

@Component(
        reference = {
                @Reference(
                        name = "renditionResolver",
                        bind = "bindAssetRenditionDispatcher",
                        unbind = "unbindAssetRenditionDispatcher",
                        service = AssetRenditionDispatcher.class,
                        policy = ReferencePolicy.DYNAMIC,
                        policyOption = ReferencePolicyOption.GREEDY,
                        cardinality = ReferenceCardinality.MULTIPLE
                )
        }
)
public class AssetRenditionsImpl implements AssetRenditions {
    private static final Logger log = LoggerFactory.getLogger(AssetRenditionsImpl.class);

    @Reference
    private ModelFactory modelFactory;

    private final RankedServices<AssetRenditionDispatcher> assetRenditionResolvers = new RankedServices<>(Order.DESCENDING);

    protected void bindAssetRenditionDispatcher(AssetRenditionDispatcher service, Map<String, Object> props) {
        log.debug("Binding AssetRenditionDispatcher [ {} ]", service.getClass().getName());
        assetRenditionResolvers.bind(service, props);
    }

    protected void unbindAssetRenditionDispatcher(AssetRenditionDispatcher service, Map<String, Object> props) {
        log.debug("Unbinding AssetRenditionDispatcher [ {} ]", service.getClass().getName());
        assetRenditionResolvers.unbind(service, props);
    }

    @Override
    public List<AssetRenditionDispatcher> getAssetRenditionDispatchers() {
        return assetRenditionResolvers.getList();
    }

    @Override
    public String getUrl(final SlingHttpServletRequest request, final AssetModel asset, final AssetRenditionParameters parameters) {
        String url = request.getResourceResolver().map(asset.getPath()) + "." + AssetRenditionServlet.SERVLET_EXTENSION + "/" + parameters.getRenditionName() + "/";

        if (parameters.isDownload()) {
            url += AssetRenditionParameters.DOWNLOAD + "/";
        }

        url += AssetRenditionParameters.CACHE_FILENAME;

        return url;
    }

    @Override
    public Map<String, String> getOptions(final Map<String, ? extends Object> mappings) {
        final Map<String, String> options = new LinkedHashMap<>();

        mappings.keySet().stream()
                .sorted()
                .forEach(key -> {
                    if (!options.containsValue(key)) {
                        options.put(
                                StringUtils.capitalize(StringUtils.replace(key, "_", " ")), key);
                    }
                });

        return options;
    }

    @Override
    public String evaluateExpression(final SlingHttpServletRequest request, String expression) {
        final AssetModel assetModel = modelFactory.getModelFromWrappedRequest(request, request.getResource(), AssetModel.class);

        // Even though, the name is .path, we use url since this is the URL escaped version of the path
        final String assetPath = assetModel.getPath();
        final String assetUrl = assetModel.getUrl();
        final String assetName = assetModel.getName();
        final String assetExtension = StringUtils.substringAfterLast(assetName, ".");
        final String renditionName = new AssetRenditionParameters(request).getRenditionName();

        // Dynamic Media properties
        final String dmName = assetModel.getProperties().get(PN_S7_NAME, StringUtils.EMPTY);
        final String dmId = assetModel.getProperties().get(PN_S7_ASSET_ID, StringUtils.EMPTY);
        final String dmFile = assetModel.getProperties().get(PN_S7_FILE, StringUtils.EMPTY);
        final String dmFolder = assetModel.getProperties().get(PN_S7_FOLDER, StringUtils.EMPTY);
        final String dmDomain = assetModel.getProperties().get(PN_S7_DOMAIN, StringUtils.EMPTY);
        final String dmApiServer = assetModel.getProperties().get(PN_S7_API_SERVER, StringUtils.EMPTY);

        final Map<String, String> variableMap = new HashMap<>();

        variableMap.put(VAR_ASSET_PATH, assetPath);
        variableMap.put(VAR_ASSET_URL, assetUrl);
        variableMap.put(VAR_ASSET_NAME, assetName);
        variableMap.put(VAR_ASSET_EXTENSION, assetExtension);
        variableMap.put(VAR_RENDITION_NAME, renditionName);

        variableMap.put(VAR_DM_NAME, dmName);
        variableMap.put(VAR_DM_ID, dmId);
        variableMap.put(VAR_DM_FILE, dmFile);
        variableMap.put(VAR_DM_FOLDER, dmFolder);
        variableMap.put(VAR_DM_DOMAIN, dmDomain);
        variableMap.put(VAR_DM_API_SERVER, dmApiServer);

        expression = StringUtils.replaceEachRepeatedly(expression,
                variableMap.keySet().toArray(new String[variableMap.keySet().size()]),
                variableMap.values().toArray(new String[variableMap.values().size()]));

        return expression;
    }
}
