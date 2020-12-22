/*
 * Asset Share Commons
 *
 * Copyright (C) 2017 Adobe
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

package com.adobe.aem.commons.assetshare.components.predicates;

import java.util.Arrays;
import java.util.Comparator;

import javax.inject.Named;

import com.adobe.aem.commons.assetshare.components.predicates.options.OptionItem;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.commons.WCMUtils;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Required;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class AbstractPredicate implements Predicate {
    private static final Logger log = LoggerFactory.getLogger(AbstractPredicate.class);

    private static final String REQUEST_ATTR_PREDICATE_GROUP_TRACKER = "asset-share-commons__predicate-group";

    private static final String REQUEST_ATTR_FORM_ID_TRACKER = "asset-share-commons__form-id";
    private static final String PN_GENERATE_PREDICATE_GROUP_ID = "generatePredicateGroupId";

    private static final Integer INITIAL_GROUP_ID = 0;

    @Self
    @Required
    private SlingHttpServletRequest request;

    @ValueMapValue
    @Default(booleanValues = false)
    private boolean expanded;

    @ValueMapValue
    @Default(booleanValues = false)
    private boolean autoSearch;

    @ValueMapValue
    @Named("updateMethod")
    @Default(values = "")
    private String componentUpdateMethod;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String id;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL, name = JcrConstants.JCR_TITLE)
    protected String title;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String name;

    @ValueMapValue
    @Default(values = "")
    protected String value;

    private boolean groupInitAttempted = false;
    private String group;

    /**
     * Asset Share Predicate Methods
     **/

    public boolean isExpanded() {
        if (!expanded) {
            // Handling incoming request query params
            return StringUtils.isNotBlank(getInitialValue()) || !getInitialValues().isEmpty();
        }

        return expanded;
    }

    public boolean isAutoSearch() {
        return autoSearch;
    }

    public String getGroup() {
        if (!groupInitAttempted && group == null) {
            if (isGroupIdGeneratingComponent(request)) { // && isReady()) {
                group = generateGroupId(request) + "_group";
            }

            groupInitAttempted = true;
        }

        return group;
    }

    public String getInitialValue() {
        return null;
    }

    public ValueMap getInitialValues() {
        return ValueMap.EMPTY;
    }

    public String getName() {
        if (name == null) {
            final com.day.cq.wcm.api.components.Component component = WCMUtils.getComponent(request.getResource());

            if (component != null) {
                name = component.getName();
            }
        }

        return name;
    }

    public String getId() {
        if (id == null) {
            id = "cmp-" + getName() + "_" + String.valueOf(Math.abs(request.getResource().getPath().hashCode() - 1));
        }
        
        return id;
    }

    public String getComponentUpdateMethod() {
        return componentUpdateMethod;
    }

    public String getTitle() {
        return this.title;
    }

    public String getValue() {
        return this.value;
    }

    public String getFormId() {
        if (request.getAttribute(REQUEST_ATTR_FORM_ID_TRACKER) == null) {
            request.setAttribute(REQUEST_ATTR_FORM_ID_TRACKER, 1);
        }

        return REQUEST_ATTR_FORM_ID_TRACKER + "__" + String.valueOf(request.getAttribute(REQUEST_ATTR_FORM_ID_TRACKER));
    }

    /**
     * @return true if the request appears to be a request that has search parameters.
     */
    public boolean isParameterizedSearchRequest() {
        return Arrays.stream(new String[]{"p.", "", "_group."}).anyMatch(needle -> StringUtils.contains(request.getQueryString(), needle));
    }

    /**
     * Group helper Methods.
     **/

    /**
     * @param request the Sling Http Request object.
     * @return true if the component is marked as generating a predicate group Id.
     */
    private boolean isGroupIdGeneratingComponent(final SlingHttpServletRequest request) {
        final com.day.cq.wcm.api.components.Component component = WCMUtils.getComponent(request.getResource());
        return component != null && component.getProperties().get(PN_GENERATE_PREDICATE_GROUP_ID, false);
    }

    /**
     * Set the groupId and set the request attribute.
     *
     * @param request the Sling Http Request object.
     * @return the group id if generated, else null.
     */
    private synchronized Integer generateGroupId(final SlingHttpServletRequest request) {
        Object groupTracker = request.getAttribute(REQUEST_ATTR_PREDICATE_GROUP_TRACKER);
        Integer groupId = null;

        if (groupTracker == null) {
            groupTracker = INITIAL_GROUP_ID;
        }

        if (groupTracker instanceof Integer) {
            groupId = (Integer) groupTracker + 1;
            request.setAttribute(REQUEST_ATTR_PREDICATE_GROUP_TRACKER, group);

        }

        return groupId;
    }

    public class AlphabeticalOptionItems implements Comparator<OptionItem> {
        public int compare(OptionItem a, OptionItem b)  {
            return a.getText().compareTo(b.getText());
        }
    }
}
