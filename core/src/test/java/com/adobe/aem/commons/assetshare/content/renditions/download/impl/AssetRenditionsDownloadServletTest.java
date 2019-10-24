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

import com.adobe.aem.commons.assetshare.content.renditions.AssetRenditions;
import com.adobe.aem.commons.assetshare.content.renditions.download.AssetRenditionPacker;
import com.adobe.aem.commons.assetshare.content.renditions.impl.AssetRenditionServlet;
import com.adobe.aem.commons.assetshare.content.renditions.impl.AssetRenditionsImpl;
import com.adobe.aem.commons.assetshare.testing.MockAssetModels;
import com.adobe.aem.commons.assetshare.util.ServletHelper;
import com.adobe.aem.commons.assetshare.util.impl.ServletHelperImpl;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.models.factory.ModelFactory;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.servlet.Servlet;
import java.util.List;

import static org.junit.Assert.assertEquals;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class AssetRenditionsDownloadServletTest {
    private final AemContext ctx = new AemContext();

    @Mock
    ModelFactory modelFactory;

    @Mock
    com.adobe.aem.commons.assetshare.content.AssetModel asset1;

    @Mock
    com.adobe.aem.commons.assetshare.content.AssetModel asset2;

    @Before
    public void setUp() {
        ctx.load().json(getClass().getResourceAsStream("AssetRenditionsDownloadServletTest.json"), "/content");

        MockAssetModels.mockModelFactory(ctx, modelFactory, "/content/dam/test-1.png");
        MockAssetModels.mockModelFactory(ctx, modelFactory, "/content/dam/test-2.png");

        ctx.registerService(AssetRenditionPacker.class, new AssetRenditionZipperImpl());

        ctx.registerService(AssetRenditions.class, new AssetRenditionsImpl());

        ctx.registerService(ServletHelper.class, new ServletHelperImpl());

        ctx.registerService(ModelFactory.class, modelFactory, org.osgi.framework.Constants.SERVICE_RANKING,
                Integer.MAX_VALUE);
    }

    @Test
    public void getAssets() {
        ctx.registerInjectActivateService(new AssetRenditionsDownloadServlet());

        AssetRenditionsDownloadServlet servlet = (AssetRenditionsDownloadServlet) ctx.getService(Servlet.class);

        ctx.request().setQueryString("path=/content/dam/test-1.png&path=/content/dam/test-2.png&path=/content/dam/test-3.png");

        List<com.adobe.aem.commons.assetshare.content.AssetModel> actual = servlet.getAssets(ctx.request());

        assertEquals(2, actual.size());
        assertEquals("/content/dam/test-1.png", actual.get(0).getPath());
        assertEquals("/content/dam/test-2.png", actual.get(1).getPath());
    }

    @Test
    public void getRenditionNames() {
        ctx.registerInjectActivateService(new AssetRenditionServlet());
        AssetRenditionsDownloadServlet servlet = (AssetRenditionsDownloadServlet) ctx.getService(Servlet.class);

        ctx.currentResource("/content/allowed-rendition-names");
        ctx.request().setQueryString("renditionName=one&renditionName=two&renditionName=four");

        List<String> actual = servlet.getRenditionNames(ctx.request());
        assertEquals(2, actual.size());
        assertEquals("one", actual.get(0));
        assertEquals("two", actual.get(1));
    }
}