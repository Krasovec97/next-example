import {useFormStatus} from "react-dom";

export default function FormSubmitButton({shouldBeDisabled = false}) {
    const { pending } = useFormStatus()

    const handleClick = (event: { preventDefault: () => void; }) => {
        if (pending) {
            event.preventDefault()
        }
    }

    if (pending) {
        return (
            <div className="spinner-border" role="status">
                <span className="sr-only"></span>
            </div>
        )
    } else {
        return (
            <button className="btn btn-primary" aria-disabled={pending} disabled={shouldBeDisabled || pending} type="submit" onClick={handleClick}>
                Submit
            </button>
        )
    }
}