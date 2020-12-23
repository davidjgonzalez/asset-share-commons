/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2017 Adobe
 ~
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
package com.adobe.aem.commons.assetshare.components.options.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Named;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;

import com.adobe.aem.commons.assetshare.components.options.OptionItem;
import com.adobe.aem.commons.assetshare.components.options.Options;
import com.adobe.granite.ui.components.ds.DataSource;
import com.adobe.granite.ui.components.ds.SimpleDataSource;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.request.RequestDispatcherOptions;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Model(
        adaptables = {SlingHttpServletRequest.class},
        adapters = {Options.class},
        resourceType = {OptionsImpl.RESOURCE_TYPE},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class OptionsImpl implements Options {

    private static final Logger log = LoggerFactory.getLogger(OptionsImpl.class);

    static final String RESOURCE_TYPE = "asset-share-commons/options";
    private static final String PN_TYPE = "type";
    private static final String OPTION_ITEMS_PATH = "items";

    @ChildResource
    @Named(OPTION_ITEMS_PATH)
    private List<Resource> itemResources;

    @ValueMapValue(name = OptionsImpl.PN_TYPE)
    private String typeString;

    @ValueMapValue
    private String listPath;

    @ValueMapValue
    private String datasourceRT;

    @ValueMapValue(name = "source")
    private String sourceString;

    @ScriptVariable
    private Resource resource;

    @ScriptVariable
    private SlingHttpServletResponse response;

    @ScriptVariable
    private ResourceResolver resolver;

    @Self
    private SlingHttpServletRequest request;

    private Type type;
    private List<OptionItem> optionItems;

    @Override
    public List<OptionItem> getItems() {
        if (optionItems == null) {
            populateOptionItems();
        }
        return Collections.unmodifiableList(optionItems);
    }

    @Override
    public Type getType() {
        if (type == null) {
            type = Options.Type.fromString(typeString);
        }
        return type;
    }

    private void populateOptionItems() {
        this.optionItems = new ArrayList<>();
        Source source = Source.getSource(sourceString);
        if (source == null) {
            populateOptionItemsFromLocal();
        } else {
            switch (source) {
                case DATASOURCE:
                    populateOptionItemsFromDatasource();
                    break;
                case LIST:
                    populateOptionItemsFromList();
                    break;
                default:
                    populateOptionItemsFromLocal();
            }
        }
    }

    private void populateOptionItemsFromLocal() {
        if (itemResources != null) {
            for (Resource itemResource : itemResources) {
                OptionItem optionItem = new OptionItemImpl(request, resource, itemResource);
                if ((optionItem.isDisabled() || StringUtils.isNotBlank(optionItem.getValue()))) {
                    optionItems.add(optionItem);
                }
            }
        }
    }

    private void populateOptionItemsFromList() {
        if (StringUtils.isBlank(listPath)) {
            return;
        }
        Resource parent = resolver.getResource(listPath);
        if (parent != null) {
            for (Resource itemResource : parent.getChildren()) {
                OptionItem optionItem = new OptionItemImpl(request, resource, itemResource);
                if ((optionItem.isDisabled() || StringUtils.isNotBlank(optionItem.getValue()))) {
                    optionItems.add(optionItem);
                }
            }
        }
    }

    @SuppressWarnings("unchecked")
    private void populateOptionItemsFromDatasource() {
        if (StringUtils.isBlank(datasourceRT)) {
            return;
        }
        // build the options by running the datasource code (the list is set as a
        // request attribute)
        RequestDispatcherOptions opts = new RequestDispatcherOptions();
        opts.setForceResourceType(datasourceRT);
        RequestDispatcher dispatcher = request.getRequestDispatcher(resource, opts);
        try {
            if (dispatcher != null) {
                dispatcher.include(request, response);
            } else {
                log.error("Failed to include the datasource at " + datasourceRT);
            }
        } catch (IOException | ServletException | RuntimeException e) {
            log.error("Failed to include the datasource at " + datasourceRT, e);
        }

        // retrieve the datasource from the request and adapt it to form options
        SimpleDataSource dataSource = (SimpleDataSource) request.getAttribute(DataSource.class.getName());
        if (dataSource != null) {
            Iterator<Resource> itemIterator = dataSource.iterator();
            if (itemIterator != null) {
                while (itemIterator.hasNext()) {
                    Resource itemResource = itemIterator.next();
                    OptionItem optionItem = new OptionItemImpl(request, resource, itemResource);
                    if ((optionItem.isDisabled() || StringUtils.isNotBlank(optionItem.getValue()))) {
                        optionItems.add(optionItem);
                    }
                }
            }
        }
    }

    private enum Source {
        LOCAL("local"), LIST("list"), DATASOURCE("datasource");

        private String element;

        Source(String element) {
            this.element = element;
        }

        private static Source getSource(String value) {
            for (Source source : values()) {
                if (StringUtils.equalsIgnoreCase(source.element, value)) {
                    return source;
                }
            }
            return null;
        }
    }

}