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

package com.adobe.aem.commons.assetshare.components.predicates.impl;

import com.adobe.aem.commons.assetshare.components.predicates.AbstractPredicate;
import com.adobe.aem.commons.assetshare.components.predicates.FulltextPredicate;
import com.adobe.aem.commons.assetshare.util.PredicateUtil;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import org.apache.sling.api.wrappers.ValueMapDecorator;
import com.day.cq.search.eval.FulltextPredicateEvaluator;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Required;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import javax.annotation.Nonnull;
import java.util.HashMap;

@Model(
        adaptables = {SlingHttpServletRequest.class},
        adapters = {FulltextPredicate.class, ComponentExporter.class},
        resourceType = {FulltextPredicateImpl.RESOURCE_TYPE}
)
@Exporter(
    name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION
)
public class FulltextPredicateImpl extends AbstractPredicate implements FulltextPredicate {
    protected static final String RESOURCE_TYPE = "asset-share-commons/components/search/search-bar";

    @ValueMapValue
    @Default(booleanValues = false)
    private boolean hideButton;

    @ValueMapValue
    private String placeholder;

    @ValueMapValue
    private String buttonLabel;

    @Self
    @Required
    private SlingHttpServletRequest request;

    @Override
    public String getName() {
        return FulltextPredicateEvaluator.FULLTEXT;
    }

    @Override
    public boolean isHideButton() {
        return hideButton;
    }

    @Override
    public String getPlaceholder() {
        return placeholder;
    }

    @Override
    public String getButtonLabel() {
        return buttonLabel;
    }

    @Override
    public boolean isReady() {
        return true;
    }

    @Override
    public String getInitialValue() {
        return PredicateUtil.getParamFromQueryParams(request, getName());
    }

    @Override
    public ValueMap getInitialValues() {
        final ValueMap intialValues = new ValueMapDecorator(new HashMap<>());
        intialValues.put(getName(), getInitialValue());
        return intialValues;
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}