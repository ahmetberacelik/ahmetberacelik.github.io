---
lang: "en"
projectSlug: "lifeline"
title: "LifeLine"
tagline: "Offline voice first-aid assistant"
year: "2026"
meta: "Course project · Team of 2"
summary: "LifeLine is a device that listens as you describe what happened and tells you short first-aid steps out loud. Put a finger on the sensor and it also measures your heart rate and blood oxygen level and takes them into account in its answer. It never connects to the internet; the AI models that understand speech, write the answer, and speak it all run on the computer next to it. We built it with Beyza Aydın as the final project for the CEN322 Internet of Things (IoT) course."
tags:
  - "ESP32-S3"
  - "ESP-IDF"
  - "FreeRTOS"
  - "Whisper"
  - "Llama 3.2"
repos:
  - label: "Source"
    url: "https://github.com/Beyzaydinn/LifeLine"
facts:
  - label: "Type"
    value: "Course project · Team of 2"
  - label: "Hardware"
    value: "ESP32-S3, INMP441, MAX98357A, MAX30102"
  - label: "Firmware"
    value: "C, ESP-IDF, FreeRTOS"
  - label: "Local AI"
    value: "Faster-Whisper, Llama 3.2, Piper"
  - label: "Link"
    value: "USB serial, CRC16, AES"
  - label: "Operation"
    value: "Fully offline"
media:
  - type: "image"
    src: "lifeline-devre.jpg"
    alt: "LifeLine circuit wired on a breadboard with ESP32-S3, microphone, speaker amplifier, pulse sensor, and LED ring"
    captionTitle: "LifeLine"
    captionSub: "Breadboard circuit"
    orientation: "portrait"
technicalDetailsTitle: "Technical details"
technicalDetails:
  - "Hardware: ESP32-S3, INMP441 microphone and MAX98357A speaker amplifier (two separate I2S buses, 16 kHz), MAX30102 heart rate and blood oxygen sensor (I2C), 8-LED WS2812B ring."
  - "Firmware: C, ESP-IDF, and FreeRTOS; audio, sensor, LEDs, and communication run in separate tasks, all coordinated by a state machine."
  - "Communication: serial link over USB at 921600 baud. A binary frame format we designed ourselves, with sync bytes and CRC16; audio and sensor data are AES-encrypted."
  - "Heart rate: the constant component is filtered out of the raw signal, peaks are detected, and the heart rate is taken from the median of the intervals between beats. With no finger on the sensor or an irregular signal, it reports \"could not measure\" instead of a wrong number. At startup it tests itself with a synthetic 72 BPM signal."
  - "Blood oxygen: estimated from the ratio of red to infrared light; not calibrated against a medical device."
  - "AI: Faster-Whisper (on the GPU, falling back to the CPU), Llama 3.2 on Ollama, and Piper; all local, with no API keys or cloud."
  - "Why two parts: the board has no extra memory, so the models cannot run on the device; the device handles the real-time work and the computer handles the AI."
order: 3
featured: true
---

## My contribution

- The two of us designed the device together, wired the circuit, and demonstrated it live in class.
- Wrote the firmware in C: audio recording and playback, sensor reading, status lights, and communication with the computer.
- Developed the signal processing that calculates heart rate and blood oxygen from the sensor's raw light data.
- Wrote the computer side: the application and interface that connect three local models for speech-to-text, answer generation, and text-to-speech.

## How it works

- The user first places a finger on the sensor; the device measures heart rate and blood oxygen level.
- Then they describe what happened in English. The microphone on the device records the audio and sends it to the computer encrypted.
- On the computer, Whisper turns the speech into text, Llama 3.2 writes a short first-aid answer that takes the measurements into account, and Piper turns that answer into speech.
- The audio goes back to the device and plays through the speaker. The answer arrives within a few seconds.
- The LED ring shows what the system is doing by color: idle, listening, thinking, speaking.
- The model does not give drug doses or diagnoses; it gives general first-aid steps only. This is a course demo, not a medical device.
