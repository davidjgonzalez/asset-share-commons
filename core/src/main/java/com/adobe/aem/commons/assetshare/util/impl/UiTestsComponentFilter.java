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

package com.adobe.aem.commons.assetshare.util.impl;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.xss.XSSAPI;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.*;
import java.io.IOException;
import java.util.Arrays;
import java.util.stream.Collectors;

@Component(
        configurationPolicy = ConfigurationPolicy.OPTIONAL,
        service = {
                Filter.class
        },
        property = {
                "filter.order:Integer=-180",
                "sling.filter.scope=COMPONENT",
                "sling.filter.pattern=/content/asset-share-commons-test/.*",
                "sling.filter.methods=GET",
                "sling.filter.extensions=html"
        }
)
public class UiTestsComponentFilter implements Filter {
    private static final Logger log = LoggerFactory.getLogger(UiTestsComponentFilter.class);

    private static final String PN_UI_TESTS_PROPERTY_NAME = "uiTestIds";
    private static final String ATTR_DATA_DASH = "data-asset-share-ui-tests";

    @Reference
    XSSAPI xssapi;

    @Override
    public void init(FilterConfig filterConfig) {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain) throws IOException, ServletException {
        final SlingHttpServletRequest request = (SlingHttpServletRequest) servletRequest;
        final SlingHttpServletResponse response = (SlingHttpServletResponse) servletResponse;

        final Resource resource = request.getResource();

        if (resource != null && !ResourceUtil.isNonExistingResource(resource)) {

            final String[] values = resource.getValueMap().get(PN_UI_TESTS_PROPERTY_NAME, String[].class);

            if (ArrayUtils.isNotEmpty(values)) {
                final String protectedValues = Arrays.stream(values)
                        .map(value -> xssapi.encodeForHTMLAttr(value))
                        .collect(Collectors.joining(" "));

                if (log.isDebugEnabled()) {
                    log.debug("Adding [ {} = {} ] around resource [ {} ]", new String[]{ATTR_DATA_DASH, protectedValues, resource.getPath()});
                }

                response.getWriter().println("<span " + ATTR_DATA_DASH + "=\"" + protectedValues + "\">");

                chain.doFilter(request, response);

                response.getWriter().println("</span>");

                return;
            }
        }

        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {

    }
}
