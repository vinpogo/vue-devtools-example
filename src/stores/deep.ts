import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { trackRef } from '@/trackRef'

export type Deep = { id: string; children?: Deep[] }
export const useDeepStore = defineStore('deep', () => {
  const deeplyNested = ref<Deep>({
    id: 'root',
    children: [
      {
        id: '1',
        children: [
          {
            id: '1.1',
            children: [
              {
                id: '1.1.1',
                children: [
                  { id: '1.1.1.1' },
                  { id: '1.1.1.2' },
                  { id: '1.1.1.3' },
                  { id: '1.1.1.4' }
                ]
              },
              {
                id: '1.1.2',
                children: [
                  { id: '1.1.2.1' },
                  { id: '1.1.2.2' },
                  { id: '1.1.2.3' },
                  { id: '1.1.2.4' }
                ]
              },
              {
                id: '1.1.3',
                children: [
                  { id: '1.1.3.1' },
                  { id: '1.1.3.2' },
                  { id: '1.1.3.3' },
                  { id: '1.1.3.4' }
                ]
              },
              {
                id: '1.1.4',
                children: [
                  { id: '1.1.4.1' },
                  { id: '1.1.4.2' },
                  { id: '1.1.4.3' },
                  { id: '1.1.4.4' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: '2',
        children: [
          {
            id: '2.1',
            children: [
              {
                id: '2.1.1',
                children: [
                  { id: '2.1.1.1' },
                  { id: '2.1.1.2' },
                  { id: '2.1.1.3' },
                  { id: '2.1.1.4' }
                ]
              },
              {
                id: '2.1.2',
                children: [
                  { id: '2.1.2.1' },
                  { id: '2.1.2.2' },
                  { id: '2.1.2.3' },
                  { id: '2.1.2.4' }
                ]
              },
              {
                id: '2.1.3',
                children: [
                  { id: '2.1.3.1' },
                  { id: '2.1.3.2' },
                  { id: '2.1.3.3' },
                  { id: '2.1.3.4' }
                ]
              },
              {
                id: '2.1.4',
                children: [
                  { id: '2.1.4.1' },
                  { id: '2.1.4.2' },
                  { id: '2.1.4.3' },
                  { id: '2.1.4.4' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: '3',
        children: [
          {
            id: '3.1',
            children: [
              {
                id: '3.1.1',
                children: [
                  { id: '3.1.1.1' },
                  { id: '3.1.1.2' },
                  { id: '3.1.1.3' },
                  { id: '3.1.1.4' }
                ]
              },
              {
                id: '3.1.2',
                children: [
                  { id: '3.1.2.1' },
                  { id: '3.1.2.2' },
                  { id: '3.1.2.3' },
                  { id: '3.1.2.4' }
                ]
              },
              {
                id: '3.1.3',
                children: [
                  { id: '3.1.3.1' },
                  { id: '3.1.3.2' },
                  { id: '3.1.3.3' },
                  { id: '3.1.3.4' }
                ]
              },
              {
                id: '3.1.4',
                children: [
                  { id: '3.1.4.1' },
                  { id: '3.1.4.2' },
                  { id: '3.1.4.3' },
                  { id: '3.1.4.4' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: '4',
        children: [
          {
            id: '4.1',
            children: [
              {
                id: '4.1.1',
                children: [
                  { id: '4.1.1.1' },
                  { id: '4.1.1.2' },
                  { id: '4.1.1.3' },
                  { id: '4.1.1.4' }
                ]
              },
              {
                id: '4.1.2',
                children: [
                  { id: '4.1.2.1' },
                  { id: '4.1.2.2' },
                  { id: '4.1.2.3' },
                  { id: '4.1.2.4' }
                ]
              },
              {
                id: '4.1.3',
                children: [
                  { id: '4.1.3.1' },
                  { id: '4.1.3.2' },
                  { id: '4.1.3.3' },
                  { id: '4.1.3.4' }
                ]
              },
              {
                id: '4.1.4',
                children: [
                  { id: '4.1.4.1' },
                  { id: '4.1.4.2' },
                  { id: '4.1.4.3' },
                  { id: '4.1.4.4' }
                ]
              }
            ]
          }
        ]
      }
    ]
  })
  trackRef(deeplyNested)

  return { deeplyNested }
})
