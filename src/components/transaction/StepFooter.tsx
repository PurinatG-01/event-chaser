export function StepFooter(props: StepFooterProps) {
  const { onGoPrev, onGoNext, hidePrev, hideNext } = props
  return (
    <div className="flex w-full justify-between mt-auto pt-4">
      {!hidePrev ? (
        <button
          onClick={() => {
            if (!!onGoPrev) onGoPrev()
          }}
          className="btn mr-auto"
        >
          Back
        </button>
      ) : (
        <></>
      )}
      {!hideNext ? (
        <button
          onClick={() => {
            if (!!onGoNext) onGoNext()
          }}
          className="btn ml-auto"
        >
          Next
        </button>
      ) : (
        <></>
      )}
    </div>
  )
}

export interface StepFooterProps extends BaseTransactionStepProps {
  hidePrev: boolean
  hideNext: boolean
}

export interface BaseTransactionStepProps {
  onGoPrev?: () => void
  onGoNext?: () => void
}
