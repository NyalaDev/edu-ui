declare let OneSignal: oneSignal.OneSignal

declare namespace oneSignal {
  interface OneSignal {
    sendTag(key: string, value: string): void
    sendTags(tags: object): void
    push(func: VoidFunction): void
  }
}
