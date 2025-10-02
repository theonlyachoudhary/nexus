'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { Clock, Gift, Target, TrendingUp, CheckCircle } from 'lucide-react'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import { SectionHeader } from '@/components/SectionHeader'

// Extend Window type to include 'calendar'
declare global {
  interface Window {
    calendar?: any
  }
}

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: SerializedEditorState
  heading?: string
  subheading?: string
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
    heading,
    subheading,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Whoops! Looks like something went wrong. Please try again.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  // Google Calendar Appointment Scheduling Button
  const calendarRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    // Only add script if not already present
    if (!document.getElementById('google-calendar-script')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://calendar.google.com/calendar/scheduling-button-script.css'
      document.head.appendChild(link)

      const script = document.createElement('script')
      script.id = 'google-calendar-script'
      script.src = 'https://calendar.google.com/calendar/scheduling-button-script.js'
      script.async = true
      script.onload = () => {
        if (window.calendar && calendarRef.current) {
          window.calendar.schedulingButton.load({
            url: 'https://calendar.google.com/calendar/appointments/AcZssZ3ps-h4_G8P2pVK1RiBnFET-DdEy5djM6bzX8Y=?gv=true',
            color: '#001d6c',
            label: 'Get in Touch',
            target: calendarRef.current,
          })
        }
      }
      document.body.appendChild(script)
    } else {
      if (window.calendar && calendarRef.current) {
        window.calendar.schedulingButton.load({
          url: 'https://calendar.google.com/calendar/appointments/AcZssZ3ps-h4_G8P2pVK1RiBnFET-DdEy5djM6bzX8Y=?gv=true',
          color: '#001d6c',
          label: 'Get in Touch',
          target: calendarRef.current,
        })
      }
    }
  }, [])

  return (
    <div className="container py-24">
      <div className="flex flex-col gap-12 items-center">
        {/* Outreach Information, Calendar Button, and Intro all in one column */}
        <motion.div
          className="space-y-4 w-full max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <SectionHeader
            heading={heading || 'Get in Touch'}
            subheading={
              subheading ||
              'Ready to transform your business operations? We&apos;re here to help you achieve measurable results.'
            }
            align="left"
            spacing="sm"
            containerClassName=""
            headingClassName="text-4xl md:text-5xl font-semibold"
            subheadingClassName="text-xl subtitle text-brand-text-secondary"
          />
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.13,
                },
              },
            }}
          >
            {[
              {
                icon: Clock,
                title: 'Quick Response Time',
                desc: 'We typically respond to all inquiries within 2-4 business hours during weekdays.',
              },
              {
                icon: Gift,
                title: 'Free Consultation',
                desc: "Your first consultation is completely free. We'll assess your needs and provide actionable insights.",
              },
              {
                icon: Target,
                title: 'Personalized Approach',
                desc: 'Every business is unique. We tailor our solutions to your specific challenges and goals.',
              },
              {
                icon: TrendingUp,
                title: 'Proven Results',
                desc: 'Join our satisfied clients who have achieved 30-150% improvements in efficiency and growth.',
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                className="flex items-start space-x-3"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
                }}
              >
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="">{item.title}</h3>
                  <p className="">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Google Calendar Appointment Button */}
          <div className="pt-8 flex justify-center">
            <div ref={calendarRef} />
          </div>

          {enableIntro && introContent && (
            <motion.div
              className="max-w-lg pt-8 border-t border-border mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <RichText data={introContent} enableGutter={false} />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
