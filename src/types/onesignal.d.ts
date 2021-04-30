declare let OneSignal: oneSignal.OneSignal

declare namespace oneSignal {
  interface OneSignal {
    sendTag(key: string, value: string): void
    sendTags(tags: Record<string, unknown>): void
    push(func: VoidFunction): void
  }
}
