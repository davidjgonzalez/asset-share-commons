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

import com.day.cq.commons.PathInfo;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.request.*;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;

import javax.annotation.CheckForNull;
import javax.annotation.Nonnull;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletInputStream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpSession;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.security.Principal;
import java.util.*;

public class SyntheticSlingHttpServletRequest implements SlingHttpServletRequest {

    private final Resource resource;
    private final ResourceResolver resourceResolver;
    private final String method;
    private RequestPathInfo requestPathInfo;
    private String characterEncoding;
    private Map<String, Object> attributes;
    private URI uri;
    private Map<String, Object> headers;
    private Map<String, Object> parameters;
    private RequestDispatcher requestDispatcher;

    public SyntheticSlingHttpServletRequest(ResourceResolver resourceResolver, String method, String urlString) {

        this.uri = URI.create(urlString);

        if (uri == null) {
            requestPathInfo = new PathInfo(uri.getPath());
        } else {
            requestPathInfo = new PathInfo(urlString);
        }


        this.method = method;
        this.resourceResolver = resourceResolver;
        this.resource = resourceResolver.getResource(requestPathInfo.getResourcePath());
        this.characterEncoding = "UTF-8";
    }

    @Nonnull
    @Override
    public Resource getResource() {
        return resource;
    }

    @Nonnull
    @Override
    public ResourceResolver getResourceResolver() {
        return resourceResolver;
    }

    @Nonnull
    @Override
    public RequestPathInfo getRequestPathInfo() {
        return requestPathInfo;
    }

    @Override
    public String getMethod() {
        return method;
    }

    @Override
    public String getPathInfo() {
        return requestPathInfo.getSuffix();
    }

    @Override
    public Object getAttribute(String name) {
        return this.attributes.get(name);
    }

    @Override
    public Enumeration getAttributeNames() {
        return Collections.enumeration(this.attributes.keySet());
    }

    @Override
    public String getCharacterEncoding() {
        return characterEncoding;
    }

    @Override
    public void setCharacterEncoding(String characterEncoding) throws UnsupportedEncodingException {
        this.characterEncoding = characterEncoding;
    }

    @Override
    public void setAttribute(String name, Object o) {
        this.attributes.put(name, o);
    }

    @Override
    public void removeAttribute(String name) {
        this.attributes.remove(name);
    }

    @Override
    public Locale getLocale() {
        return Locale.getDefault();
    }

    @Override
    public Enumeration getLocales() {
        final List<Locale> locales = new ArrayList<>();
        locales.add(getLocale());
        return Collections.enumeration(locales);
    }

    @Override
    public boolean isSecure() {
        return false;
    }

    @Override
    public String getScheme() {
        return uri != null ? uri.getScheme() : null;
    }

    @Override
    public String getServerName() {
        return "localhost";
    }

    @Override
    public String getContextPath() {
        return "";
    }

    @Override
    public String getQueryString() {
        return uri.getQuery();
    }

    public void setRequestDispatcher(final RequestDispatcher requestDispatcher) {
        this.requestDispatcher = requestDispatcher;
    }

    @Override
    public RequestDispatcher getRequestDispatcher(String path) {
        return requestDispatcher;
    }

    @CheckForNull
    @Override
    public RequestDispatcher getRequestDispatcher(@Nonnull String s, RequestDispatcherOptions requestDispatcherOptions) {
        return requestDispatcher;
    }

    @CheckForNull
    @Override
    public RequestDispatcher getRequestDispatcher(@Nonnull Resource resource, RequestDispatcherOptions requestDispatcherOptions) {
        return requestDispatcher;
    }

    @CheckForNull
    @Override
    public RequestDispatcher getRequestDispatcher(@Nonnull Resource resource) {
        return requestDispatcher;
    }




    @CheckForNull
    @Override
    public RequestParameter getRequestParameter(@Nonnull String s) {
        return null;
    }

    @CheckForNull
    @Override
    public RequestParameter[] getRequestParameters(@Nonnull String s) {
        return new RequestParameter[0];
    }

    @Nonnull
    @Override
    public RequestParameterMap getRequestParameterMap() {
        return null;
    }

    @Nonnull
    @Override
    public List<RequestParameter> getRequestParameterList() {
        return null;
    }

    @CheckForNull
    @Override
    public Cookie getCookie(String s) {
        return null;
    }


    @CheckForNull
    @Override
    public ResourceBundle getResourceBundle(Locale locale) {
        return null;
    }

    @CheckForNull
    @Override
    public ResourceBundle getResourceBundle(String s, Locale locale) {
        return null;
    }

    @Nonnull
    @Override
    public RequestProgressTracker getRequestProgressTracker() {
        return null;
    }

    @Override
    public String getAuthType() {
        return null;
    }

    @Override
    public Cookie[] getCookies() {
        return new Cookie[0];
    }

    @Override
    public long getDateHeader(String name) {
        Object tmp = headers.get(name);
        if (tmp instanceof Date) {
            return ((Date) tmp).getTime();
        } else if (tmp instanceof Calendar) {
            return ((Calendar) tmp).getTimeInMillis();
        } else if (tmp instanceof Long) {
            return (Long) tmp;
        }
        return 0;
    }

    @Override
    public String getHeader(String name) {
        return String.valueOf(attributes.get(name));
    }

    @Override
    public Enumeration getHeaders(String name) {
        return null;
    }

    @Override
    public Enumeration getHeaderNames() {
        return Collections.enumeration(headers.keySet());
    }

    @Override
    public int getIntHeader(String name) {
        Object tmp = headers.get(name);
        if (tmp instanceof Integer) {
            return (Integer) tmp;
        } else if (tmp instanceof String) {
            try {
                return Integer.parseInt((String) tmp);
            } catch (NumberFormatException e) {
                // return 0 below
            }
        }
        return 0;
    }

    @Override
    public String getRequestURI() {
        return uri.toString();
    }

    @Override
    public StringBuffer getRequestURL() {
        return new StringBuffer(uri.toString());
    }

    @Override
    public String getServletPath() {
        return requestPathInfo.getResourcePath();
    }


    @Override
    public String getParameter(String name) {
        return null;
    }

    @Override
    public Enumeration getParameterNames() {
        return null;
    }

    @Override
    public String[] getParameterValues(String name) {
        return new String[0];
    }

    @Override
    public Map getParameterMap() {
        return null;
    }


    /* Unused */
    @Override
    public int getContentLength() {
        return 0;
    }

    @Override
    public String getContentType() {
        return null;
    }


    @Override
    public ServletInputStream getInputStream() throws IOException {
        return null;
    }

    @Override
    public BufferedReader getReader() throws IOException {
        return null;
    }

    @CheckForNull
    @Override
    public String getResponseContentType() {
        return null;
    }

    @Nonnull
    @Override
    public Enumeration<String> getResponseContentTypes() {
        return null;
    }

    @Override
    public String getRealPath(String path) {
        return null;
    }

    @Override
    public int getServerPort() {
        return 0;
    }

    @Override
    public String getPathTranslated() {
        return null;
    }

    @Override
    public String getProtocol() {
        return null;
    }

    @Override
    public String getRemoteAddr() {
        return null;
    }

    @Override
    public String getRemoteHost() {
        return null;
    }

    @Override
    public String getRemoteUser() {
        return null;
    }

    @Override
    public boolean isUserInRole(String role) {
        return false;
    }

    @Override
    public Principal getUserPrincipal() {
        return null;
    }

    @Override
    public String getRequestedSessionId() {
        return null;
    }

    @Override
    public int getRemotePort() {
        return 0;
    }

    @Override
    public String getLocalName() {
        return null;
    }

    @Override
    public String getLocalAddr() {
        return null;
    }

    @Override
    public int getLocalPort() {
        return 0;
    }

    @Override
    public boolean isRequestedSessionIdValid() {
        return false;
    }

    @Override
    public boolean isRequestedSessionIdFromCookie() {
        return false;
    }

    @Override
    public boolean isRequestedSessionIdFromURL() {
        return false;
    }

    @Override
    public boolean isRequestedSessionIdFromUrl() {
        return false;
    }

    @Override
    public HttpSession getSession(boolean create) {
        throw new UnsupportedOperationException("HttpSessions are not supported");
    }

    @Override
    public HttpSession getSession() {
        throw new UnsupportedOperationException("HttpSessions are not supported");
    }

    @CheckForNull
    @Override
    public <AdapterType> AdapterType adaptTo(@Nonnull Class<AdapterType> aClass) {
        return null;
    }
}
