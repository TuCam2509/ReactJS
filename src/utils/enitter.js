import Eventmitter from 'events';
const _emitter=new Eventmitter();
_emitter.setMaxListeners(0);

export const emitter=_emitter