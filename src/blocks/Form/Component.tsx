'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { Clock, Gift, Target, TrendingUp, CheckCircle } from 'lucide-react'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import { SectionHeader } from '@/components/SectionHeader'

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

  return (
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left Column - Outreach Information */}
        <div className="space-y-4">
          <SectionHeader
            heading={heading || 'Get in Touch'}
            subheading={
              subheading ||
              "Ready to transform your business operations? We're here to help you achieve measurable results."
            }
            align="left"
            spacing="sm"
            containerClassName=""
            headingClassName="text-4xl md:text-5xl font-semibold"
            subheadingClassName="text-xl subtitle text-brand-text-secondary"
          />
          <div className="space-y-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="">Quick Response Time</h3>
                <p className="">
                  We typically respond to all inquiries within 2-4 business hours during weekdays.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                <Gift className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="">Free Consultation</h3>
                <p className="">
                  Your first consultation is completely free. We'll assess your needs and provide
                  actionable insights.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="">Personalized Approach</h3>
                <p className="">
                  Every business is unique. We tailor our solutions to your specific challenges and
                  goals.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="">Proven Results</h3>
                <p className="">
                  Join our satisfied clients who have achieved 30-150% improvements in efficiency
                  and growth.
                </p>
              </div>
            </div>
          </div>

          {enableIntro && introContent && !hasSubmitted && (
            <div className="max-w-lg ml-4 pt-4 border-t border-border">
              <RichText data={introContent} enableGutter={false} />
            </div>
          )}
        </div>

        {/* Right Column - Form */}
        <div className="lg:sticky lg:top-8">
          <div className="p-8 lg:p-10 border border-border rounded-lg bg-background shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Send us a message</h3>

            <FormProvider {...formMethods}>
              {!isLoading && hasSubmitted && confirmationType === 'message' && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <RichText data={confirmationMessage} />
                  </div>
                </div>
              )}
              {isLoading && !hasSubmitted && (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-10 w-10 border-3 border-primary border-t-transparent mx-auto mb-6"></div>
                  <p className="text-lg text-muted-foreground font-condensed">
                    Sending your message...
                  </p>
                </div>
              )}
              {error && (
                <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg mb-8">
                  <p className="text-red-800 dark:text-red-200 font-condensed">{`${error.status || '500'}: ${error.message || ''}`}</p>
                </div>
              )}
              {!hasSubmitted && (
                <form id={formID} onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div className="space-y-6">
                    {formFromProps &&
                      formFromProps.fields &&
                      formFromProps.fields?.map((field, index) => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const Field: React.FC<any> =
                          fields?.[field.blockType as keyof typeof fields]
                        if (Field) {
                          return (
                            <div key={index} className="space-y-2">
                              <Field
                                form={formFromProps}
                                {...field}
                                {...formMethods}
                                control={control}
                                errors={errors}
                                register={register}
                              />
                            </div>
                          )
                        }
                        return null
                      })}
                  </div>

                  <Button
                    form={formID}
                    type="submit"
                    variant="default"
                    className="w-full mt-8 h-12 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all duration-200"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground border-t-transparent"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      submitButtonLabel || 'Send Message'
                    )}
                  </Button>
                </form>
              )}
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  )
}
