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

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.StringWriter;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
class AssetRenditionDownloadResponseTest {

    private final AemContext ctx = new AemContext();

    StringWriter stringWriter;

    ByteArrayOutputStream baos;

    @BeforeEach
    void setUp() {
        stringWriter = new StringWriter();
        baos = new ByteArrayOutputStream();
    }

    @Test
    void isAndGetRedirect_WithSendRedirect() throws IOException {
        AssetRenditionDownloadResponse response = new AssetRenditionDownloadResponse(ctx.response(), stringWriter, baos);
        response.sendRedirect("/test.html");

        assertTrue(response.isRedirect());
        assertEquals("/test.html", response.getRedirect());
    }

    @Test
    void isAndGetRedirect_WithSetStatus301() throws IOException {
        AssetRenditionDownloadResponse response = new AssetRenditionDownloadResponse(ctx.response(), stringWriter, baos);
        response.setStatus(301);
        response.setHeader("Location", "/test.html");

        assertTrue(response.isRedirect());
        assertEquals("/test.html", response.getRedirect());
    }
    @Test

    void isAndGetRedirect_WithSetStatus302() throws IOException {
        AssetRenditionDownloadResponse response = new AssetRenditionDownloadResponse(ctx.response(), stringWriter, baos);
        response.setStatus(302);
        response.setHeader("Location", "/test.html");

        assertTrue(response.isRedirect());
        assertEquals("/test.html", response.getRedirect());
    }

    @Test
    void getByteArrayOutputStream() {
        baos.write(100);

        AssetRenditionDownloadResponse response = new AssetRenditionDownloadResponse(ctx.response(), stringWriter, baos);

        assertEquals(baos, response.getByteArrayOutputStream());
    }

    @Test
    void getStatusCode_WithSetStatus() {
        AssetRenditionDownloadResponse response = new AssetRenditionDownloadResponse(ctx.response(), stringWriter, baos);
        response.setStatus(200);

        assertEquals(200, response.getStatusCode());
    }

    @Test
    void getStatusCode_WithSendError() throws IOException {
        AssetRenditionDownloadResponse response = new AssetRenditionDownloadResponse(ctx.response(), stringWriter, baos);
        response.sendError(404);

        assertEquals(404, response.getStatusCode());
    }

    @Test
    void getStatusCode_WithSendErrorWithMessage() {
        AssetRenditionDownloadResponse response = new AssetRenditionDownloadResponse(ctx.response(), stringWriter, baos);
        response.sendError(404, "test");

        assertEquals(404, response.getStatusCode());
    }

    @Test
    void getContentType() {
        AssetRenditionDownloadResponse response = new AssetRenditionDownloadResponse(ctx.response(), stringWriter, baos);
        response.setHeader("Content-Type", "application/test");

        assertEquals("application/test", response.getContentType());
    }
}