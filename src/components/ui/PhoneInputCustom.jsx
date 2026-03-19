import * as React from "react"
import PhoneInput from 'react-phone-number-input'
import { getCountryCallingCode } from 'react-phone-number-input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './Select'
import { cn } from "../../lib/utils"

const CountrySelect = ({ value, onChange, options, disabled, placeholder }) => {
  return (
    <Select
      value={value}
      onValueChange={(val) => onChange(val)}
      disabled={disabled}
    >
      <SelectTrigger className="w-[80px] h-full border-none bg-transparent rounded-r-none hover:bg-foreground/5 transition-colors px-2 focus:ring-0 focus:border-none">
        <div className="flex items-center gap-1">
          {value && (
            <img
              src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${value}.svg`}
              alt={value}
              className="w-5 h-auto"
            />
          )}
        </div>
      </SelectTrigger>
      <SelectContent className="max-h-[300px] z-[110]" sideOffset={4} align="end">
        {options.map(({ value: countryValue, label }) => (
          <SelectItem key={countryValue || 'ZZ'} value={countryValue || 'ZZ'}>
            <div className="flex items-center gap-3">
              {countryValue && (
                <img
                  src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryValue}.svg`}
                  alt={label}
                  className="w-5 h-auto rounded-sm"
                />
              )}
              <span className="flex-1">{label}</span>
              {countryValue && (
                <span className="text-muted-foreground text-xs">
                  +{getCountryCallingCode(countryValue)}
                </span>
              )}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

const PhoneInputCustom = React.forwardRef(({ className, error, inputClassName, ...props }, ref) => {
  return (
    <div dir="ltr" className={cn(
      "flex h-12 w-full items-center rounded-2xl bg-[var(--input-bg)] border border-[var(--glass-border)] focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all duration-300",
      error && "border-red-500/50",
      className
    )}>
      <PhoneInput
        {...props}
        ref={ref}
        countrySelectComponent={CountrySelect}
        className="flex-1 h-full flex items-center rounded-2xl"
        numberInputProps={{
          className: cn(
            "bg-transparent border-none outline-none flex-1 text-foreground px-6 h-full w-full rounded-r-2xl border-l border-foreground/5 shadow-inner",
            inputClassName
          )
        }}
      />
    </div>
  )
})

PhoneInputCustom.displayName = "PhoneInputCustom"

export { PhoneInputCustom }
