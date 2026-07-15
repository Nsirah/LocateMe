'use client'

import { Button } from '@/components/ui/button'

export default function SubmitSection({

isFormValid,
isLoading

}){

return(

<div className="space-y-6">

<div className="bg-muted border border-border rounded-lg p-5">

<p className="text-sm text-muted-foreground">

Fields marked with *

<strong> are compulsory.</strong>

If any required field is empty, the report will not be submitted.

False information may lead to account suspension.

</p>

</div>

<Button

type="submit"

disabled={!isFormValid || isLoading}

className="w-full h-12 bg-secondary hover:bg-secondary/90"

>

{isLoading ? "Submitting Report..." : "Submit Missing Person Report"}

</Button>

</div>

)

}