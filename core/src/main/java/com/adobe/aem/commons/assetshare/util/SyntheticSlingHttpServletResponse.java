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

package com.adobe.aem.commons.assetshare.util;

import com.adobe.acs.commons.util.ServletOutputStreamWrapper;
import org.apache.sling.api.SlingHttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.CheckForNull;
import javax.annotation.Nonnull;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.util.Locale;

public class SyntheticSlingHttpServletResponse implements SlingHttpServletResponse {
    private static final String UNSUPPORTED_OPERATION_MESSAGE = "Synthetic Response does not support this operation";
    private static final Logger log = LoggerFactory.getLogger(SyntheticSlingHttpServletResponse.class);


    private String redirect = null;
    private int statusCode;
    private String errorMessage;
    private String statusMessage;
    private String contentType;
    private String characterEncoding;
    private int contentLength;
    private Locale locale;
    private int bufferSize;

    private ServletOutputStream outputStream;
    private PrintWriter printWriter = new PrintWriter(new StringWriter());

    public SyntheticSlingHttpServletResponse(final OutputStream wrappedOutputStream) {
        outputStream =  new ServletOutputStreamWrapper(wrappedOutputStream);
    }

    @Override
    public String encodeURL(String url) {
        return encodeRedirectUrl(url);
    }

    @Override
    public String encodeUrl(String url) {
        try {
            return URLEncoder.encode(url, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            log.error(String.format("Could not URLEncode [ %s ]", url), e);
            return null;
        }
    }

    @Override
    public String encodeRedirectURL(String url) {
        return encodeRedirectUrl(url);
    }

    @Override
    public String encodeRedirectUrl(String url) {
        try {
            return URLEncoder.encode(url, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            log.error(String.format("Could not URLEncode [ %s ]", url), e);
            return null;
        }
    }

    @Override
    public void sendError(int sc, String msg) throws IOException {
        this.statusCode = sc;
        this.errorMessage = msg;
    }

    @Override
    public void sendError(int sc) throws IOException {
        this.statusCode = sc;
    }

    @Override
    public void sendRedirect(String location) throws IOException {
        this.redirect = location;
    }

    @Override
    public void setStatus(int sc) {
        this.statusCode = sc;
    }

    @Override
    public void setStatus(int sc, String sm) {
        this.statusCode = sc;
        this.statusMessage = sm;
    }

    @Override
    public String getCharacterEncoding() {
        return characterEncoding;
    }

    @Override
    public String getContentType() {
        return contentType;
    }

    @Override
    public ServletOutputStream getOutputStream() throws IOException {
        return outputStream;
    }

    @Override
    public PrintWriter getWriter() throws IOException {
        return printWriter;
    }

    @Override
    public void setCharacterEncoding(String charset) {
        this.characterEncoding = charset;
    }

    @Override
    public void setContentLength(int len) {
        this.contentLength = len;
    }

    @Override
    public void setContentType(String type) {
        this.contentType = type;
    }

    @Override
    public void setBufferSize(int size) {
        this.bufferSize = size;
    }

    @Override
    public int getBufferSize() {
        return bufferSize;
    }

    @Override
    public void flushBuffer() throws IOException {
        // Do nothing
    }

    @Override
    public void resetBuffer() {

    }

    @Override
    public boolean isCommitted() {
        return false;
    }

    @Override
    public void reset() {

    }

    @Override
    public void setLocale(Locale loc) {
        this.locale = loc;
    }

    @Override
    public Locale getLocale() {
        return locale;
    }

    @Override
    public void setDateHeader(String name, long date) {
        throw new UnsupportedOperationException(UNSUPPORTED_OPERATION_MESSAGE);
    }

    @Override
    public void addDateHeader(String name, long date) {
        throw new UnsupportedOperationException(UNSUPPORTED_OPERATION_MESSAGE);
    }

    @Override
    public void setHeader(String name, String value) {
        throw new UnsupportedOperationException(UNSUPPORTED_OPERATION_MESSAGE);
    }

    @Override
    public void addHeader(String name, String value) {
        throw new UnsupportedOperationException(UNSUPPORTED_OPERATION_MESSAGE);
    }

    @Override
    public void setIntHeader(String name, int value) {
        throw new UnsupportedOperationException(UNSUPPORTED_OPERATION_MESSAGE);
    }

    @Override
    public void addIntHeader(String name, int value) {
        throw new UnsupportedOperationException(UNSUPPORTED_OPERATION_MESSAGE);
    }

    @Override
    public void addCookie(Cookie cookie) {
        throw new UnsupportedOperationException(UNSUPPORTED_OPERATION_MESSAGE);
    }

    @Override
    public boolean containsHeader(String name) {
        throw new UnsupportedOperationException(UNSUPPORTED_OPERATION_MESSAGE);
    }


    @CheckForNull
    @Override
    public <AdapterType> AdapterType adaptTo(@Nonnull Class<AdapterType> aClass) {
        return null;
    }
}
