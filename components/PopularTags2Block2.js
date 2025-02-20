import React from 'react';
import { Touchable, withTheme } from '@draftbit/ui';
import { ScrollView, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const PopularTags2Block2 = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  return (
    <View
      style={StyleSheet.applyWidth(
        { flexDirection: 'row', height: 38 },
        dimensions.width
      )}
    >
      {/* Tags Scroll */}
      <ScrollView
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        bounces={false}
        contentContainerStyle={StyleSheet.applyWidth(
          { paddingLeft: 24, paddingRight: 24 },
          dimensions.width
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {/* All Tag */}
        <View
          style={StyleSheet.applyWidth({ marginRight: 12 }, dimensions.width)}
        >
          {/* Selected Touchable */}
          <>
            {!Constants['tag_all_selected'] ? null : (
              <Touchable>
                {/* Tag Selected View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      alignSelf: 'flex-start',
                      backgroundColor: theme.colors.branding.primary,
                      borderColor: theme.colors.branding.primary,
                      borderRadius: 19,
                      borderWidth: 2,
                      height: 38,
                      justifyContent: 'center',
                      paddingLeft: 20,
                      paddingRight: 20,
                    },
                    dimensions.width
                  )}
                >
                  {/* Tag Text */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Body L Semibold'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Body L Semibold'].style,
                        { color: 'theme.colors["White"]' }
                      ),
                      dimensions.width
                    )}
                  >
                    {'✅ All'}
                  </Text>
                </View>
              </Touchable>
            )}
          </>
          {/* Unselected Touchable */}
          <>
            {Constants['tag_all_selected'] ? null : (
              <Touchable>
                {/* Tag Unselected View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      alignSelf: 'flex-start',
                      borderColor: theme.colors.branding.primary,
                      borderRadius: 19,
                      borderWidth: 2,
                      height: 38,
                      justifyContent: 'center',
                      paddingLeft: 20,
                      paddingRight: 20,
                    },
                    dimensions.width
                  )}
                >
                  {/* Tag Text */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Body L Semibold'].props}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['Body L Semibold'].style,
                      dimensions.width
                    )}
                  >
                    {'✅ All'}
                  </Text>
                </View>
              </Touchable>
            )}
          </>
        </View>
        {/* Music Tag */}
        <View
          style={StyleSheet.applyWidth({ marginRight: 12 }, dimensions.width)}
        >
          {/* Selected Touchable */}
          <>
            {!Constants['tag_music_selected'] ? null : (
              <Touchable>
                {/* Tag Selected View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      alignSelf: 'flex-start',
                      backgroundColor: theme.colors.branding.primary,
                      borderColor: theme.colors.branding.primary,
                      borderRadius: 19,
                      borderWidth: 2,
                      height: 38,
                      justifyContent: 'center',
                      paddingLeft: 20,
                      paddingRight: 20,
                    },
                    dimensions.width
                  )}
                >
                  {/* Tag Text */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Body L Semibold'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Body L Semibold'].style,
                        { color: 'theme.colors["White"]' }
                      ),
                      dimensions.width
                    )}
                  >
                    {'🎵 Music'}
                  </Text>
                </View>
              </Touchable>
            )}
          </>
          {/* Unselected Touchable */}
          <>
            {Constants['tag_music_selected'] ? null : (
              <Touchable>
                {/* Tag Unselected View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      alignSelf: 'flex-start',
                      borderColor: theme.colors.branding.primary,
                      borderRadius: 19,
                      borderWidth: 2,
                      height: 38,
                      justifyContent: 'center',
                      paddingLeft: 20,
                      paddingRight: 20,
                    },
                    dimensions.width
                  )}
                >
                  {/* Tag Text */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Body L Semibold'].props}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['Body L Semibold'].style,
                      dimensions.width
                    )}
                  >
                    {'🎵 Music'}
                  </Text>
                </View>
              </Touchable>
            )}
          </>
        </View>
        {/* Workshop Tag */}
        <View
          {...GlobalStyles.ViewStyles(theme)['Tag'].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.ViewStyles(theme)['Tag'].style,
            dimensions.width
          )}
        >
          {/* Selected Touchable */}
          <>
            {!Constants['tag_workshop_selected'] ? null : (
              <Touchable>
                {/* Tag Selected View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      alignSelf: 'flex-start',
                      backgroundColor: theme.colors.branding.primary,
                      borderColor: theme.colors.branding.primary,
                      borderRadius: 19,
                      borderWidth: 2,
                      height: 38,
                      justifyContent: 'center',
                      paddingLeft: 20,
                      paddingRight: 20,
                    },
                    dimensions.width
                  )}
                >
                  {/* Tag Text */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Body L Semibold'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Body L Semibold'].style,
                        { color: 'theme.colors["White"]' }
                      ),
                      dimensions.width
                    )}
                  >
                    {'💼 Workshops'}
                  </Text>
                </View>
              </Touchable>
            )}
          </>
          {/* Unselected Touchable */}
          <>
            {Constants['tag_workshop_selected'] ? null : (
              <Touchable>
                {/* Tag Unselected View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      alignSelf: 'flex-start',
                      borderColor: theme.colors.branding.primary,
                      borderRadius: 19,
                      borderWidth: 2,
                      height: 38,
                      justifyContent: 'center',
                      paddingLeft: 20,
                      paddingRight: 20,
                    },
                    dimensions.width
                  )}
                >
                  {/* Tag Text */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Body L Semibold'].props}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['Body L Semibold'].style,
                      dimensions.width
                    )}
                  >
                    {'💼 Workshops'}
                  </Text>
                </View>
              </Touchable>
            )}
          </>
        </View>
        {/* Art Tag */}
        <View
          {...GlobalStyles.ViewStyles(theme)['Tag'].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.ViewStyles(theme)['Tag'].style,
            dimensions.width
          )}
        >
          {/* Selected Touchable */}
          <>
            {!Constants['tag_art_selected'] ? null : (
              <Touchable>
                {/* Tag Selected View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      alignSelf: 'flex-start',
                      backgroundColor: theme.colors.branding.primary,
                      borderColor: theme.colors.branding.primary,
                      borderRadius: 19,
                      borderWidth: 2,
                      height: 38,
                      justifyContent: 'center',
                      paddingLeft: 20,
                      paddingRight: 20,
                    },
                    dimensions.width
                  )}
                >
                  {/* Tag Text */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Body L Semibold'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Body L Semibold'].style,
                        { color: 'theme.colors["White"]' }
                      ),
                      dimensions.width
                    )}
                  >
                    {'🎨 Art'}
                  </Text>
                </View>
              </Touchable>
            )}
          </>
          {/* Unselected Touchable */}
          <>
            {Constants['tag_art_selected'] ? null : (
              <Touchable>
                {/* Tag Unselected View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      alignSelf: 'flex-start',
                      borderColor: theme.colors.branding.primary,
                      borderRadius: 19,
                      borderWidth: 2,
                      height: 38,
                      justifyContent: 'center',
                      paddingLeft: 20,
                      paddingRight: 20,
                    },
                    dimensions.width
                  )}
                >
                  {/* Tag Text */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Body L Semibold'].props}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['Body L Semibold'].style,
                      dimensions.width
                    )}
                  >
                    {'🎨 Art'}
                  </Text>
                </View>
              </Touchable>
            )}
          </>
        </View>
        {/* Food & Drink Tag */}
        <View
          {...GlobalStyles.ViewStyles(theme)['Tag'].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.ViewStyles(theme)['Tag'].style,
            dimensions.width
          )}
        >
          {/* Selected Touchable */}
          <>
            {!Constants['tag_food_selected'] ? null : (
              <Touchable>
                {/* Tag Selected View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      alignSelf: 'flex-start',
                      backgroundColor: theme.colors.branding.primary,
                      borderColor: theme.colors.branding.primary,
                      borderRadius: 19,
                      borderWidth: 2,
                      height: 38,
                      justifyContent: 'center',
                      paddingLeft: 20,
                      paddingRight: 20,
                    },
                    dimensions.width
                  )}
                >
                  {/* Tag Text */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Body L Semibold'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Body L Semibold'].style,
                        { color: 'theme.colors["White"]' }
                      ),
                      dimensions.width
                    )}
                  >
                    {'🍕 Food & Drink'}
                  </Text>
                </View>
              </Touchable>
            )}
          </>
          {/* Unselected Touchable */}
          <>
            {Constants['tag_food_selected'] ? null : (
              <Touchable>
                {/* Tag Unselected View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      alignSelf: 'flex-start',
                      borderColor: theme.colors.branding.primary,
                      borderRadius: 19,
                      borderWidth: 2,
                      height: 38,
                      justifyContent: 'center',
                      paddingLeft: 20,
                      paddingRight: 20,
                    },
                    dimensions.width
                  )}
                >
                  {/* Tag Text */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Body L Semibold'].props}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['Body L Semibold'].style,
                      dimensions.width
                    )}
                  >
                    {'🍕 Food & Drink'}
                  </Text>
                </View>
              </Touchable>
            )}
          </>
        </View>
        {/* Fashion Tag */}
        <View
          {...GlobalStyles.ViewStyles(theme)['Tag'].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.ViewStyles(theme)['Tag'].style,
            dimensions.width
          )}
        >
          {/* Selected Touchable */}
          <>
            {!Constants['tag_fashion_selected'] ? null : (
              <Touchable>
                {/* Tag Selected View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      alignSelf: 'flex-start',
                      backgroundColor: theme.colors.branding.primary,
                      borderColor: theme.colors.branding.primary,
                      borderRadius: 19,
                      borderWidth: 2,
                      height: 38,
                      justifyContent: 'center',
                      paddingLeft: 20,
                      paddingRight: 20,
                    },
                    dimensions.width
                  )}
                >
                  {/* Tag Text */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Body L Semibold'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Body L Semibold'].style,
                        { color: 'theme.colors["White"]' }
                      ),
                      dimensions.width
                    )}
                  >
                    {'🧥 Fashion'}
                  </Text>
                </View>
              </Touchable>
            )}
          </>
          {/* Unselected Touchable */}
          <>
            {Constants['tag_fashion_selected'] ? null : (
              <Touchable>
                {/* Tag Unselected View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      alignSelf: 'flex-start',
                      borderColor: theme.colors.branding.primary,
                      borderRadius: 19,
                      borderWidth: 2,
                      height: 38,
                      justifyContent: 'center',
                      paddingLeft: 20,
                      paddingRight: 20,
                    },
                    dimensions.width
                  )}
                >
                  {/* Tag Text */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Body L Semibold'].props}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['Body L Semibold'].style,
                      dimensions.width
                    )}
                  >
                    {'🧥 Fashion'}
                  </Text>
                </View>
              </Touchable>
            )}
          </>
        </View>
      </ScrollView>
    </View>
  );
};

export default withTheme(PopularTags2Block2);
