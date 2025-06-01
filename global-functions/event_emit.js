import * as eventBus from '../custom-files/eventBus';

const event_emit = (event_name, data) => {
  eventBus.default.emit(event_name, data);
};

export default event_emit;
