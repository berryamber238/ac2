import PhoneSelectActionSheetBlock from '../components/PhoneSelectActionSheetBlock';
import PayForLiveDialogBlock from '../components/PayForLiveDialogBlock';
import { registerSheet } from 'react-native-actions-sheet';
import AIUploadTranscribeBlock from '../components/AIUploadTranscribeBlock';
// registerSheet('hello', PhoneSelectActionSheetBlock);

registerSheet('pay-for-live', PayForLiveDialogBlock);
registerSheet('ai-upload', PayForLiveDialogBlock);
