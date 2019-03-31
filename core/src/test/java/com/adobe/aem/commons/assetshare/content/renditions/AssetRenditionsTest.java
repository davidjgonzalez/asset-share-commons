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

package com.adobe.aem.commons.assetshare.content.renditions;

import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class AssetRenditionsTest {

    /**
     *  AssetRenditions.UrlParams
     */

    @Test
    public void getRenditionName() {
        String expected = "test";
        AssetRenditions.UrlParams params = new AssetRenditions.UrlParams(expected, false);
        assertEquals(expected, params.getRenditionName());
    }

    @Test
    public void setRenditionName() {
        String expected = "test";
        AssetRenditions.UrlParams params = new AssetRenditions.UrlParams();
        params.setRenditionName(expected);
        assertEquals(expected, params.getRenditionName());
    }

    @Test
    public void isDownload() {
        boolean expected = true;
        AssetRenditions.UrlParams params = new AssetRenditions.UrlParams("test", expected);
        assertTrue(params.isDownload());
    }

    @Test
    public void setDownload() {
        boolean expected = true;
        AssetRenditions.UrlParams params = new AssetRenditions.UrlParams();
        params.setDownload(expected);
        assertTrue(expected);
    }

    @Test
    public void setAndGet() {
        String expected = "testing";
        AssetRenditions.UrlParams params = new AssetRenditions.UrlParams();
        params.put("test", expected);
        assertEquals(expected, params.get("test", String.class));
    }
}