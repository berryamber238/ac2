import * as StyleSheet from './utils/StyleSheet';

import Breakpoints from './utils/Breakpoints';

import palettes from './themes/palettes';

export const DividerStyles = theme =>
  StyleSheet.create({ Divider: { style: {}, props: {} } });

export const TabViewItemStyles = theme =>
  StyleSheet.create({ 'Tab View Item': { style: {}, props: {} } });

export const SwiperStyles = theme =>
  StyleSheet.create({ Swiper: { style: {}, props: {} } });

export const ImageStyles = theme =>
  StyleSheet.create({ Image: { style: {}, props: {} } });

export const ViewStyles = theme =>
  StyleSheet.create({
    'Bottom Button': {
      style: {
        alignItems: 'center',
        backgroundColor: palettes.App.appStyle_white,
        bottom: 0,
        justifyContent: 'center',
        paddingBottom: 36,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 24,
        position: 'absolute',
        width: '100%',
      },
      props: {},
    },
    'Bottom Tab Navigation': {
      style: {
        backgroundColor: 'theme.colors["White"]',
        bottom: 0,
        paddingBottom: 8,
        paddingLeft: 32,
        paddingRight: 32,
        paddingTop: 8,
        position: 'absolute',
        width: '100%',
      },
      props: {},
    },
    'Bottom Tab Navigation 2': {
      style: {
        backgroundColor: 'theme.colors["White"]',
        bottom: 0,
        paddingBottom: 8,
        paddingLeft: 32,
        paddingRight: 32,
        paddingTop: 8,
        position: 'absolute',
        width: '100%',
      },
      props: {},
    },
    'Button With Icon': {
      style: {
        alignItems: 'center',
        alignSelf: 'flex-start',
        borderColor: theme.colors.branding.primary,
        borderRadius: 50,
        borderWidth: 1,
        flexDirection: 'row',
        paddingBottom: 6,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 6,
      },
      props: {},
    },
    'Button With Icon Filled': {
      style: {
        alignItems: 'center',
        alignSelf: 'flex-start',
        borderColor: theme.colors.branding.primary,
        borderRadius: 50,
        borderWidth: 1,
        flexDirection: 'row',
        paddingBottom: 6,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 6,
      },
      props: {},
    },
    'Favorite Button Small': {
      style: { alignItems: 'center', justifyContent: 'center' },
      props: {},
    },
    'Favorite Button Small 2': {
      style: { alignItems: 'center', justifyContent: 'center' },
      props: {},
    },
    'Favorite Medium': {
      style: { alignItems: 'center', justifyContent: 'center' },
      props: {},
    },
    'Horizontal Buttons': {
      style: { flexDirection: 'row', justifyContent: 'center', width: '100%' },
      props: {},
    },
    'Image Item 120x120': {
      style: {
        alignItems: 'center',
        borderRadius: 20,
        height: 120,
        justifyContent: 'center',
        marginRight: 16,
        overflow: 'hidden',
        width: 120,
      },
      props: {},
    },
    'Image Item 120x121': {
      style: {
        alignItems: 'center',
        borderRadius: 20,
        height: 120,
        justifyContent: 'center',
        overflow: 'hidden',
        width: 120,
      },
      props: {},
    },
    'Information Card': {
      style: {
        backgroundColor: 'theme.colors["White"]',
        borderRadius: 28,
        flexDirection: 'column',
        padding: 24,
        width: '100%',
      },
      props: {},
    },
    'Light Purple Button 2': {
      style: {
        alignItems: 'center',
        backgroundColor: 'theme.colors["Primary 100"]',
        borderRadius: 30,
        height: 58,
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
      },
      props: {},
    },
    'Login Form Container': {
      style: {
        alignItems: 'center',
        borderColor: palettes.App['Custom Color 4'],
        borderRadius: 3,
        borderWidth: 1,
        flexDirection: 'row',
        height: 45,
        marginTop: 8,
        paddingBottom: 4,
        paddingLeft: 14,
        paddingTop: 4,
      },
      props: {},
    },
    'Main Content': {
      style: { flex: 1, paddingBottom: 16, paddingTop: 16 },
      props: {},
    },
    'Main Content 2': {
      style: {
        flex: 1,
        paddingBottom: 16,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 16,
      },
      props: {},
    },
    'Main Content 3': { style: { flex: 1, paddingTop: 16 }, props: {} },
    'Main Content 4': { style: { paddingTop: 16 }, props: {} },
    'Main Content 5': { style: { flex: 1 }, props: {} },
    'Notification Item': { style: { marginBottom: 24 }, props: {} },
    'Notification Item 2': { style: { marginBottom: 24 }, props: {} },
    'Page Top': {
      style: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 48,
        width: '100%',
      },
      props: {},
    },
    'Page Top 2': {
      style: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 48,
        width: '100%',
      },
      props: {},
    },
    'Page Top 3': {
      style: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 48,
        width: '100%',
      },
      props: {},
    },
    'Page Top 4': {
      style: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 48,
        width: '100%',
      },
      props: {},
    },
    'Page Top 5': {
      style: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 48,
        width: '100%',
      },
      props: {},
    },
    'Page Top 6': {
      style: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 48,
        width: '100%',
      },
      props: {},
    },
    'Page Top 7': {
      style: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 48,
        width: '100%',
      },
      props: {},
    },
    'Page Top 8': {
      style: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 48,
        width: '100%',
      },
      props: {},
    },
    'Picker Section': {
      style: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 4,
        marginTop: -4,
      },
      props: {},
    },
    PickupItem: {
      style: {
        alignSelf: 'flex-start',
        backgroundColor: palettes.Brand.itemBgNormal,
        flex: 1,
        flexWrap: 'nowrap',
        margin: 12,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
      },
      props: {},
    },
    'Popular Events List': {
      style: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        width: '100%',
      },
      props: {},
    },
    'Popular Events List 2': {
      style: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        paddingLeft: 24,
        width: '100%',
      },
      props: {},
    },
    'Popular Tags': {
      style: { flexDirection: 'row', height: 38, marginBottom: 24 },
      props: {},
    },
    'Popular Tags 2': {
      style: { flexDirection: 'row', height: 38, marginBottom: 24 },
      props: {},
    },
    'Popular Tags 3': {
      style: { flexDirection: 'row', height: 38 },
      props: {},
    },
    'Popular Tags 4': {
      style: { flexDirection: 'row', height: 38, marginBottom: 24 },
      props: {},
    },
    'Profile Top Item': {
      style: { alignItems: 'center', paddingBottom: 24 },
      props: {},
    },
    'Result Item': { style: { flexDirection: 'row', padding: 14 }, props: {} },
    'Result Item 2': {
      style: { flexDirection: 'row', padding: 14 },
      props: {},
    },
    'Search Item': {
      style: {
        alignItems: 'center',
        backgroundColor: 'theme.colors["Greyscale 100"]',
        borderRadius: 16,
        flexDirection: 'row',
        height: 56,
        justifyContent: 'flex-start',
      },
      props: {},
    },
    'Section Top': {
      style: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
      },
      props: {},
    },
    'Section Top 2': {
      style: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
      },
      props: {},
    },
    'Section Top 3': {
      style: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      props: {},
    },
    'Section Top 4': {
      style: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      props: {},
    },
    'Status Tag': {
      style: {
        alignItems: 'center',
        borderColor: theme.colors.branding.primary,
        borderRadius: 6,
        borderWidth: 1,
        justifyContent: 'center',
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 6,
      },
      props: {},
    },
    Tabs: { style: { zIndex: 0 }, props: {} },
    Tag: { style: {}, props: {} },
    'Tag 2': { style: { marginRight: 12 }, props: {} },
    Tags: {
      style: { flexDirection: 'row', height: 38, marginBottom: 24 },
      props: {},
    },
    'Tags 2': {
      style: { flexDirection: 'row', height: 38, marginBottom: 24 },
      props: {},
    },
    'Tags 3': {
      style: { flexDirection: 'row', height: 38, marginBottom: 24 },
      props: {},
    },
    'Tags 4': {
      style: { flexDirection: 'row', height: 38, marginBottom: 24 },
      props: {},
    },
  });

export const ModalStyles = theme =>
  StyleSheet.create({ Modal: { style: {}, props: {} } });

export const IconStyles = theme =>
  StyleSheet.create({ 'Arrow Right': { style: {}, props: {} } });

export const MapViewStyles = theme =>
  StyleSheet.create({
    'Map View': {
      style: { flex: 1, height: '100%', width: '100%' },
      props: {},
    },
  });

export const ShadowStyles = theme =>
  StyleSheet.create({
    'Event Card': { style: { borderRadius: 40, opacity: 1 }, props: {} },
    'Event Card 2': { style: { borderRadius: 40, opacity: 1 }, props: {} },
    'Event Card 3': { style: { borderRadius: 40, opacity: 1 }, props: {} },
    'Information Card 2': {
      style: { borderRadius: 28, marginBottom: 24, width: '100%' },
      props: {},
    },
    'Information Card 3': {
      style: { borderRadius: 28, marginBottom: 24, width: '100%' },
      props: {},
    },
    'Total Card': {
      style: { borderRadius: 28, marginBottom: 24, width: '100%' },
      props: {},
    },
  });

export const TouchableStyles = theme =>
  StyleSheet.create({
    'Light Purple Button': {
      style: { height: '100%', width: '100%' },
      props: {},
    },
    'Popular Card': { style: { width: '50%' }, props: {} },
    'Popular Card 2': { style: { width: '50%' }, props: {} },
  });

export const FetchStyles = theme =>
  StyleSheet.create({ Fetch: { style: { minHeight: 40 }, props: {} } });

export const TextStyles = theme =>
  StyleSheet.create({
    '16_Title': {
      style: {
        color: palettes.App['Custom Color 5'],
        fontFamily: 'Urbanist_600SemiBold',
        fontSize: 16,
        letterSpacing: 0.2,
        lineHeight: 19.6,
      },
      props: {},
    },
    '16_Title 2': {
      style: {
        color: palettes.App['Custom Color 4'],
        fontFamily: 'Urbanist_600SemiBold',
        fontSize: 14,
        letterSpacing: 0.2,
        lineHeight: 19.6,
        marginLeft: 4,
      },
      props: {},
    },
    '18_Title': {
      style: {
        color: palettes.App.appStyle_greyscale_800,
        fontFamily: 'Urbanist_600SemiBold',
        fontSize: 18,
        letterSpacing: 0.2,
        lineHeight: 19.6,
      },
      props: {},
    },
    'Body L Bold': {
      style: {
        color: theme.colors.branding.primary,
        fontFamily: 'Urbanist_700Bold',
        fontSize: 16,
        letterSpacing: 0.2,
        lineHeight: 22.4,
      },
      props: {},
    },
    'Body L Medium': {
      style: {
        color: palettes.App.appStyle_greyscale_800,
        fontFamily: 'Urbanist_500Medium',
        fontSize: 16,
        letterSpacing: 0.2,
        lineHeight: 22.4,
      },
      props: {},
    },
    'Body L Regular': {
      style: {
        color: 'theme.colors["Greyscale 600"]',
        fontFamily: 'Urbanist_400Regular',
        fontSize: 16,
        letterSpacing: 0.2,
        lineHeight: 22.4,
      },
      props: {},
    },
    'Body L Semibold': {
      style: {
        color: theme.colors.branding.primary,
        fontFamily: 'Urbanist_600SemiBold',
        fontSize: 16,
        letterSpacing: 0.2,
        lineHeight: 22.4,
      },
      props: {},
    },
    'Body M Medium': {
      style: {
        color: palettes.Brand.appStyle_greyscale_700,
        fontFamily: 'Urbanist_500Medium',
        letterSpacing: 0.2,
        lineHeight: 19.6,
      },
      props: {},
    },
    'Body M Regular': {
      style: {
        color: palettes.App.appStyle_greyscale_800,
        fontFamily: 'Urbanist_400Regular',
        letterSpacing: 0.2,
        lineHeight: 19.6,
      },
      props: {},
    },
    'Body M Semibold': {
      style: {
        color: palettes.Brand.appStyle_primary,
        fontFamily: 'Urbanist_600SemiBold',
        letterSpacing: 0.2,
        lineHeight: 19.6,
      },
      props: {},
    },
    'Body S Medium': {
      style: {
        alignSelf: 'auto',
        color: palettes.Brand.appStyle_greyscale_700,
        fontFamily: 'Urbanist_500Medium',
        fontSize: 14,
      },
      props: {},
    },
    'Body S Semibold': {
      style: {
        color: palettes.Brand.appStyle_primary,
        fontFamily: 'Urbanist_600SemiBold',
        fontSize: 12,
        letterSpacing: 0.2,
        lineHeight: 14.4,
        marginBottom: 8,
      },
      props: {},
    },
    'Body XL Bold': {
      style: {
        color: palettes.Brand.appStyle_greyscale_900,
        fontFamily: 'Urbanist_700Bold',
        fontSize: 18,
        letterSpacing: 0.2,
        lineHeight: 25.2,
      },
      props: {},
    },
    'Body XL Medium': {
      style: {
        color: palettes.Brand.appStyle_greyscale_700,
        fontFamily: 'Urbanist_500Medium',
        fontSize: 18,
        letterSpacing: 0.2,
        lineHeight: 25.2,
      },
      props: {},
    },
    'Body XL Semibold': {
      style: {
        color: palettes.Brand.appStyle_greyscale_900,
        flex: 1,
        fontFamily: 'Urbanist_600SemiBold',
        fontSize: 18,
        letterSpacing: 0.2,
        lineHeight: 25.2,
      },
      props: {},
    },
    'Body XS Bold': {
      style: {
        color: theme.colors.branding.primary,
        fontFamily: 'Urbanist_700Bold',
        fontSize: 10,
        letterSpacing: 0.2,
        lineHeight: 12,
      },
      props: {},
    },
    'Body XS Medium': {
      style: {
        color: 'theme.colors["Greyscale 500"]',
        fontFamily: 'Urbanist_500Medium',
        fontSize: 10,
        letterSpacing: 0.2,
        lineHeight: 12,
      },
      props: {},
    },
    'Body XS Semibold': {
      style: {
        color: 'theme.colors["White"]',
        fontFamily: 'Urbanist_600SemiBold',
        fontSize: 10,
        letterSpacing: 0.2,
        lineHeight: 12,
      },
      props: {},
    },
    'Company List Menu': {
      style: {
        color: palettes.App['Custom Color 23'],
        fontFamily: 'System',
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 0.2,
        lineHeight: 20,
      },
      props: {},
    },
    'Create Opinion Label': {
      style: {
        color: palettes.App['Custom Color 2'],
        fontFamily: 'System',
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: 0.2,
        lineHeight: 20,
      },
      props: {},
    },
    'Daily Update Title': {
      style: {
        color: palettes.App['Custom #ffffff'],
        fontFamily: 'System',
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: 0.2,
        lineHeight: 22,
        marginLeft: 16,
        marginRight: 0,
      },
      props: {},
    },
    'Event Confirm Info': {
      style: {
        color: 'rgb(0, 0, 0)',
        fontFamily: 'System',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.2,
        lineHeight: 32,
        marginRight: 10,
      },
      props: {},
    },
    'Event Text': {
      style: {
        color: palettes.App['Custom Color 41'],
        fontFamily: 'System',
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 0.2,
        lineHeight: 19,
      },
      props: {},
    },
    'Form Label': { style: { fontSize: 14, paddingTop: 16 }, props: {} },
    H3: {
      style: {
        color: palettes.Brand.appStyle_greyscale_900,
        fontFamily: 'Urbanist_700Bold',
        fontSize: 32,
        lineHeight: 38.4,
      },
      props: {},
    },
    H4: {
      style: {
        color: palettes.Brand.appStyle_greyscale_900,
        fontFamily: 'Urbanist_700Bold',
        fontSize: 24,
        lineHeight: 28.8,
      },
      props: {},
    },
    H5: {
      style: {
        color: palettes.Brand.appStyle_greyscale_900,
        fontFamily: 'Urbanist_700Bold',
        fontSize: 20,
        lineHeight: 24,
      },
      props: {},
    },
    H6: {
      style: {
        color: palettes.Brand.appStyle_greyscale_900,
        fontFamily: 'Urbanist_700Bold',
        fontSize: 18,
        lineHeight: 21.6,
      },
      props: {},
    },
    'Search Hot Normal': {
      style: {
        fontFamily: 'System',
        fontSize: 14,
        fontWeight: '400',
        letterSpacing: 0.3,
        lineHeight: 25,
      },
      props: {},
    },
    'Search Hot Top': {
      style: {
        color: palettes.App['Custom Color 12'],
        fontFamily: 'System',
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 0.3,
        lineHeight: 25,
      },
      props: {},
    },
    Text: { style: { color: theme.colors.text.strong }, props: {} },
    'Text 2111': { style: {}, props: {} },
    'Text 2113': {
      style: {
        color: palettes.App.appStyle_greyscale_800,
        fontFamily: 'Urbanist_600SemiBold',
        fontSize: 15,
        letterSpacing: 0.2,
        lineHeight: 19.6,
      },
      props: {},
    },
    'Text Form Label': {
      style: {
        color: palettes.App.appStyle_greyscale_800,
        fontFamily: 'Urbanist_600SemiBold',
        fontSize: 16,
        letterSpacing: 0.2,
        lineHeight: 19.6,
      },
      props: {},
    },
    'Text Form Label 2': {
      style: {
        color: palettes.Brand.appStyle_primary,
        fontFamily: 'Urbanist_400Regular',
        fontSize: 14,
        letterSpacing: 0.2,
        lineHeight: 19.6,
      },
      props: {},
    },
    'Text Tip': {
      style: {
        color: palettes.Brand.itemTextNomal,
        fontFamily: 'Urbanist_400Regular',
        fontSize: 14,
        letterSpacing: 0.2,
        lineHeight: 19.6,
      },
      props: {},
    },
    'Text Title': {
      style: {
        color: 'rgb(0, 0, 0)',
        fontFamily: 'System',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 0.2,
        lineHeight: 32,
        marginRight: 10,
      },
      props: {},
    },
  });

export const SVGStyles = theme =>
  StyleSheet.create({ SVG: { style: { height: 100, width: 100 }, props: {} } });

export const LinearGradientStyles = theme =>
  StyleSheet.create({
    'Linear Gradient': { style: { height: '100%', width: '100%' }, props: {} },
  });

export const CheckboxRowStyles = theme =>
  StyleSheet.create({
    'Checkbox Row': { style: { minHeight: 50 }, props: {} },
  });

export const NumberInputStyles = theme =>
  StyleSheet.create({
    'Number Input': {
      style: {
        borderColor: theme.colors.border.brand,
        borderRadius: 8,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
      },
      props: {},
    },
  });

export const ScrollViewStyles = theme =>
  StyleSheet.create({
    'Featured Scroll View': {
      style: { paddingBottom: 24, paddingLeft: 24, paddingTop: 24 },
      props: {},
    },
    'Featured Scroll View 2': { style: { paddingBottom: 24 }, props: {} },
  });

export const LinkStyles = theme =>
  StyleSheet.create({
    'InText Link': {
      style: {
        color: palettes.Brand.appStyle_primary,
        fontFamily: 'Urbanist_400Regular',
        fontSize: 16,
        letterSpacing: 0.2,
        lineHeight: 22.4,
      },
      props: {},
    },
    Link: { style: { color: theme.colors.branding.primary }, props: {} },
    'Text Link': {
      style: {
        color: palettes.Brand.appStyle_primary,
        fontFamily: 'Urbanist_700Bold',
        fontSize: 16,
        letterSpacing: 0.2,
        lineHeight: 22.4,
      },
      props: {},
    },
    'inText link Bold': {
      style: {
        color: palettes.Brand.appStyle_primary,
        fontFamily: 'Urbanist_600SemiBold',
        fontSize: 18,
        letterSpacing: 0.2,
        lineHeight: 25.2,
      },
      props: {},
    },
  });

export const TabViewStyles = theme =>
  StyleSheet.create({
    'Events Scroll': {
      style: {
        flex: 1,
        fontFamily: 'Urbanist_600SemiBold',
        fontSize: 18,
        letterSpacing: 0.2,
        lineHeight: 25.2,
      },
      props: {},
    },
    'Events Scroll 2': {
      style: {
        fontFamily: 'Urbanist_600SemiBold',
        fontSize: 18,
        letterSpacing: 0.2,
        lineHeight: 25.2,
      },
      props: {},
    },
  });

export const DeckSwiperStyles = theme =>
  StyleSheet.create({
    'Deck Swiper': { style: { position: 'absolute' }, props: {} },
  });

export const DeckSwiperCardStyles = theme =>
  StyleSheet.create({
    'Deck Swiper Card': {
      style: {
        alignItems: 'center',
        borderWidth: 2,
        justifyContent: 'center',
        padding: 20,
      },
      props: {},
    },
  });

export const ImageBackgroundStyles = theme =>
  StyleSheet.create({ 'Image Background': { style: { flex: 1 }, props: {} } });

export const WebViewStyles = theme =>
  StyleSheet.create({
    'HTML View': { style: { flex: 1 }, props: {} },
    'Web View': { style: { flex: 1 }, props: {} },
  });

export const BottomSheetStyles = theme =>
  StyleSheet.create({
    'Bottom Sheet': {
      style: {
        paddingBottom: 10,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 10,
      },
      props: {},
    },
  });

export const ActionSheetItemStyles = theme =>
  StyleSheet.create({
    'Action Sheet Item': { style: { textAlign: 'center' }, props: {} },
  });

export const AccordionGroupStyles = theme =>
  StyleSheet.create({
    Accordion: {
      style: {
        fontSize: 16,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
      },
      props: {},
    },
  });

export const ButtonStyles = theme =>
  StyleSheet.create({
    Button: {
      style: {
        backgroundColor: palettes.Brand.appStyle_primary,
        borderRadius: 4,
        fontFamily: 'System',
        fontWeight: '700',
        textAlign: 'center',
      },
      props: { iconSize: 14 },
    },
    'Button (default)': {
      style: {
        backgroundColor: theme.colors.branding.primary,
        borderRadius: 8,
        fontFamily: 'System',
        fontWeight: '700',
        textAlign: 'center',
      },
      props: {},
    },
    'Cancel Btn': {
      style: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderRadius: 4,
        color: palettes.Brand.appStyle_primary,
        fontFamily: 'System',
        fontSize: 12,
        fontWeight: '400',
        textAlign: 'center',
      },
      props: { iconSize: 14 },
    },
    'Confirm Btn': {
      style: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderRadius: 4,
        color: palettes.Brand.appStyle_primary,
        fontFamily: 'System',
        fontSize: 12,
        fontWeight: '400',
        textAlign: 'center',
      },
      props: { iconSize: 14 },
    },
    'Text Button With Primary': {
      style: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderRadius: 4,
        color: palettes.App.appStyle_black,
        fontFamily: 'System',
        fontSize: 16,
        fontWeight: '400',
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        textAlign: 'center',
      },
      props: { iconSize: 14 },
    },
  });

export const TextInputStyles = theme =>
  StyleSheet.create({
    'Login Input': {
      style: {
        backgroundColor: 'theme.colors["Greyscale 50"]',
        borderColor: palettes.App['Custom Color 4'],
        color: palettes.App['Custom Color 5'],
        flex: 1,
        fontFamily: 'Urbanist_400Regular',
        fontSize: 14,
        letterSpacing: 0.3,
        lineHeight: 19.6,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingTop: 8,
        width: 40,
      },
      props: { placeholderTextColor: palettes.Brand.appStyle_greyscale_400 },
    },
    'Text Input': {
      style: {
        backgroundColor: 'theme.colors["Greyscale 50"]',
        color: 'theme.colors["Greyscale 900"]',
        flex: 1,
        fontFamily: 'Urbanist_600SemiBold',
        fontSize: 16,
        height: 36,
        letterSpacing: 0.2,
        lineHeight: 19.6,
        paddingLeft: 0,
        paddingRight: 20,
        paddingTop: 8,
      },
      props: { placeholderTextColor: palettes.Brand.appStyle_greyscale_400 },
    },
  });

export const TextFieldStyles = theme =>
  StyleSheet.create({
    'Login Input 2': {
      style: {
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 0,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 0,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 0,
        borderTopWidth: 1,
        paddingBottom: 8,
        paddingLeft: 4,
        paddingRight: 8,
        paddingTop: 8,
      },
      props: {
        activeBorderColor: palettes.Brand.Primary,
        leftIconMode: 'inset',
        placeholderTextColor: palettes.App['Custom Color 4'],
      },
    },
  });

export const TimerStyles = theme =>
  StyleSheet.create({
    Timer: {
      style: {
        color: theme.colors.text.strong,
        fontSize: 24,
        textAlign: 'left',
      },
      props: {},
    },
  });

export const ActivityIndicatorStyles = theme =>
  StyleSheet.create({
    'Activity Indicator': { style: { height: 36, width: 36 }, props: {} },
  });

export const SurfaceStyles = theme =>
  StyleSheet.create({ Surface: { style: { minHeight: 40 }, props: {} } });

export const BlurViewStyles = theme =>
  StyleSheet.create({
    'Blur View': {
      style: { flexBasis: 0, flexGrow: 1, flexShrink: 1 },
      props: {},
    },
  });

export const SwipeableItemStyles = theme =>
  StyleSheet.create({
    'Swipeable Item': { style: { overflow: 'hidden' }, props: {} },
  });

export const AudioPlayerStyles = theme =>
  StyleSheet.create({
    'Audio Player': {
      style: {
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        padding: 8,
      },
      props: {},
    },
  });

export const SliderStyles = theme =>
  StyleSheet.create({
    Slider: { style: { marginLeft: 12, marginRight: 12 }, props: {} },
  });

export const H1Styles = theme =>
  StyleSheet.create({
    H1: {
      style: {
        color: theme.colors.text.strong,
        fontSize: 32,
        fontWeight: 'bold',
      },
      props: {},
    },
  });

export const CircleStyles = theme =>
  StyleSheet.create({
    Circle: {
      style: {
        alignItems: 'center',
        backgroundColor: theme.colors.branding.primary,
        justifyContent: 'center',
      },
      props: {},
    },
  });

export const ExpoImageStyles = theme =>
  StyleSheet.create({
    'Image 2': { style: {}, props: {} },
    'Image 3': { style: {}, props: {} },
    'SVG 2': { style: { height: 100, width: 100 }, props: {} },
  });
