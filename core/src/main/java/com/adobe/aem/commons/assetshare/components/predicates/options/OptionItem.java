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
 
 /**
  * COPIED FROM: https://github.com/adobe/aem-core-wcm-components/blob/master/bundles/core/src/main/java/com/adobe/cq/wcm/core/components/models/form/OptionItem.java
  */
  
 package com.adobe.aem.commons.assetshare.components.predicates.options;

 import org.osgi.annotation.versioning.ConsumerType;
 
 /**
  * Interface for a single item of the {@link Options} form element.
  */
 @ConsumerType
 public interface OptionItem {
 
     /**
      * Returns {@code true} if item should be initially selected, otherwise {@code false}.
      *
      * @return {@code true} if item should be initially selected, otherwise {@code false}
      */
     default boolean isSelected() {
         throw new UnsupportedOperationException();
     }
 
     /**
      * Returns {@code true} if item should be disabled and therefore not clickable, otherwise {@code false}.
      *
      * @return {@code true} if item should be disabled and therefore not clickable, otherwise {@code false}
      */
     default boolean isDisabled() {
         throw new UnsupportedOperationException();
     }
 
     /**
      * Returns the value of this item.
      *
      * @return the value of this item
      */
     default String getValue() {
         throw new UnsupportedOperationException();
     }
 
     /**
      * Return the text for this item.
      *
      * @return the text for this item
      */
     default String getText() {
         throw new UnsupportedOperationException();
     }
 }