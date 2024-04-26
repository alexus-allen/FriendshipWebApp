import React from 'react';

import {
  ChatEngine,
  MultiChatSocket,
  useMultiChatLogic,
} from 'react-chat-engine-advanced';

export function App() {
  const chatProps = useMultiChatLogic(
    '35bbc19f-dfa1-4f54-b6d5-8394c571f413',
    'zack',
    'zack'
  );
  return (
    <>
      <MultiChatWindow {...chatProps} />
      <MultiChatSocket {...chatProps} />
    </>
  );
}