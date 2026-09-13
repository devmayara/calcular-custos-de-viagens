"use client";

import * as React from "react";
import { Loader2, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { fetchPlaceSuggestions } from "@/lib/maps-client";
import { cn } from "@/lib/utils";
import type { LugarRef, PlaceSuggestion } from "@/types/viagem";

export type PlaceAutocompleteFieldProps = {
  id: string;
  name?: string;
  label?: string;
  placeholder?: string;
  value: LugarRef | null;
  inputValue: string;
  onInputChange: (value: string) => void;
  onSelect: (lugar: LugarRef) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
};

function createSessionToken(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `sess-${Date.now()}`;
}

export function PlaceAutocompleteField({
  id,
  name,
  placeholder = "Digite um endereço ou cidade",
  value,
  inputValue,
  onInputChange,
  onSelect,
  disabled,
  error,
  className,
}: PlaceAutocompleteFieldProps) {
  const [suggestions, setSuggestions] = React.useState<PlaceSuggestion[]>([]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [mapsUnavailable, setMapsUnavailable] = React.useState(false);
  const sessionTokenRef = React.useRef(createSessionToken());
  const blurTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const listId = `${id}-suggestions`;

  React.useEffect(() => {
    const query = inputValue.trim();

    if (mapsUnavailable || query.length < 3) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    if (value?.label === query && (value.placeId || value.lat != null)) {
      setSuggestions([]);
      return;
    }

    let cancelled = false;
    setLoading(true);

    const timer = setTimeout(() => {
      void (async () => {
        try {
          const results = await fetchPlaceSuggestions(
            query,
            sessionTokenRef.current
          );
          if (!cancelled) {
            setSuggestions(results);
            setOpen(true);
            setMapsUnavailable(false);
          }
        } catch (err) {
          if (!cancelled) {
            setSuggestions([]);
            const code =
              err && typeof err === "object" && "code" in err
                ? String((err as { code?: string }).code)
                : undefined;
            const message =
              err instanceof Error ? err.message.toLowerCase() : "";
            if (
              code === "MAPS_NOT_CONFIGURED" ||
              message.includes("não foi possível buscar")
            ) {
              setMapsUnavailable(true);
            }
          }
        } finally {
          if (!cancelled) setLoading(false);
        }
      })();
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [inputValue, mapsUnavailable, value]);

  function handleSelect(suggestion: PlaceSuggestion) {
    sessionTokenRef.current = createSessionToken();
    onSelect({
      label: suggestion.description,
      placeId: suggestion.placeId,
      ...(suggestion.lat != null && suggestion.lng != null
        ? { lat: suggestion.lat, lng: suggestion.lng }
        : {}),
    });
    onInputChange(suggestion.description);
    setSuggestions([]);
    setOpen(false);
  }

  return (
    <div className={cn("relative space-y-2", className)}>
      <div className="relative">
        <MapPin
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          id={id}
          name={name}
          role="combobox"
          aria-expanded={open && suggestions.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          placeholder={placeholder}
          value={inputValue}
          disabled={disabled}
          className="min-h-12 pl-9"
          autoComplete="off"
          onChange={(e) => {
            onInputChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (suggestions.length > 0) setOpen(true);
          }}
          onBlur={() => {
            blurTimeoutRef.current = setTimeout(() => setOpen(false), 150);
          }}
        />
        {loading ? (
          <Loader2
            className="absolute top-1/2 right-3 size-4 -translate-y-1/2 animate-spin text-muted-foreground"
            aria-hidden
          />
        ) : null}
      </div>

      {open && suggestions.length > 0 ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-border bg-popover p-1 text-sm shadow-md"
        >
          {suggestions.map((suggestion) => (
            <li key={suggestion.placeId} role="option" aria-selected={false}>
              <button
                type="button"
                className="flex w-full rounded-md px-3 py-2.5 text-left hover:bg-muted focus:bg-muted focus:outline-none"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(suggestion)}
              >
                {suggestion.description}
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {error ? (
        <p id={`${id}-error`} className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : mapsUnavailable ? (
        <p className="text-xs text-muted-foreground">
          Autocomplete indisponível — digite o local e informe o km manualmente.
        </p>
      ) : null}
    </div>
  );
}
