"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { notes, accidentals, modes, progressionPatterns, type Note } from "@/lib/mockData";
import { getHarmonicField, getProgressionChords } from "@/lib/musicEngine";
import ChordDiagram from "@/components/ChordDiagram";
import { useTheme } from "next-themes";

const btnBase = "h-12 w-12 rounded-lg text-base font-semibold transition-colors duration-150";

const noteKeys: Record<string, Note> = {
  c: "C", d: "D", e: "E", f: "F", g: "G", a: "A",
};

export default function HomeClient() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedNote, setSelectedNote] = useState<Note>("C");
  const [selectedAccidental, setSelectedAccidental] = useState("");
  const [selectedMode, setSelectedMode] = useState("");
  const [instrument, setInstrument] = useState<"guitar" | "cavaco">("guitar");
  const [showDiagrams, setShowDiagrams] = useState(true);
  const [showAllProgressions, setShowAllProgressions] = useState(false);

  const urlInitialized = useRef(false);

  useEffect(() => {
    const tom = searchParams.get("tom");
    if (tom && notes.includes(tom as Note)) setSelectedNote(tom as Note);
    const ac = searchParams.get("ac");
    if (ac === "#" || ac === "b") setSelectedAccidental(ac);
    const mode = searchParams.get("mode");
    if (mode === "m") setSelectedMode(mode);
    urlInitialized.current = true;
  }, []);

  useEffect(() => {
    if (!urlInitialized.current) return;
    const params = new URLSearchParams();
    params.set("tom", selectedNote);
    if (selectedAccidental) params.set("ac", selectedAccidental);
    if (selectedMode) params.set("mode", selectedMode);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [selectedNote, selectedAccidental, selectedMode, router]);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (key === "Escape") { setSelectedAccidental(""); setSelectedMode(""); return; }
      if (key === "#") { setSelectedAccidental((prev) => (prev === "#" ? "" : "#")); return; }
      if (key === "b" && !e.shiftKey) { setSelectedAccidental((prev) => (prev === "b" ? "" : "b")); return; }

      if (key === "v" || key === "V") { setShowDiagrams((v) => !v); return; }

      if (key === "B") { setSelectedNote("B"); return; }

      const noteKey = key.toLowerCase();
      if (noteKey in noteKeys) { setSelectedNote(noteKeys[noteKey]); return; }

      if (key === "M") { setSelectedMode(""); return; }
      if (key === "m") { setSelectedMode("m"); return; }
      if (key === "1") { setInstrument("guitar"); return; }
      if (key === "2") { setInstrument("cavaco"); return; }
      if (key === "l" || key === "L") { setTheme(theme === "dark" ? "light" : "dark"); return; }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [theme, setTheme]);

  const field = useMemo(
    () => getHarmonicField(selectedNote, selectedAccidental, selectedMode),
    [selectedNote, selectedAccidental, selectedMode],
  );
  const progressions = useMemo(
    () => progressionPatterns.map(p => ({
      name: p.name,
      numerals: p.numerals.join(' - '),
      chords: getProgressionChords(field, p.numerals),
    })),
    [field],
  );

  const labelCls = "dark:text-zinc-400 text-zinc-600 tracking-wide";
  const btnInactive = "dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 bg-zinc-200 text-zinc-600 hover:bg-zinc-300";
  const fieldSection = "dark:bg-zinc-900/50 dark:border-zinc-800 bg-white border-zinc-200";
  const fieldChordCls = "dark:text-zinc-100 text-zinc-800";
  const progTitle = "dark:text-zinc-300 text-zinc-700";
  const cardCls = "dark:bg-zinc-900 dark:border-transparent bg-white border-zinc-200";
  const cardTitle = "dark:text-zinc-200 text-zinc-800";
  const toggleOff = "dark:bg-zinc-700 bg-zinc-300";

  return (
    <>
      <section className="flex w-full flex-col items-center gap-5 mb-8">
        <p className={`text-sm ${labelCls}`}>Instrumento</p>
        <div className="flex justify-center gap-2">
          {(["guitar", "cavaco"] as const).map((inst, i) => (
            <button
              key={inst}
              onClick={() => setInstrument(inst)}
              title={`Tecla: ${i + 1}`}
              aria-label={`${inst === "guitar" ? "Violão" : "Cavaco"} (tecla ${i + 1})`}
              className={`h-12 rounded-lg px-6 text-base font-semibold transition-colors duration-150 ${
                instrument === inst
                  ? "bg-orange-500 text-white"
                  : btnInactive
              }`}
            >
              {inst === "guitar" ? "Violão" : "Cavaco"}
            </button>
          ))}
        </div>

        <div className="w-3/4 border-t border-orange-500/30" />

        <p className={`text-sm ${labelCls}`}>
          Selecione o tom abaixo
          <span
            className="ml-1 cursor-help text-xs opacity-60"
            title="Tom é a nota fundamental que define o campo harmônico"
          >ⓘ</span>
        </p>

        <div className="flex flex-wrap justify-center gap-2">
          {notes.map((n) => (
            <button
              key={n}
              onClick={() => setSelectedNote(n)}
              title={`Tecla: ${n === "B" ? "Shift+B" : n}`}
              aria-label={`Tom ${n}`}
              className={`${btnBase} ${
                selectedNote === n
                  ? "bg-orange-500 text-white"
                  : btnInactive
              }`}
            >
              {n}
            </button>
          ))}
        </div>

        <div className="w-3/4 border-t border-orange-500/30" />

        <div className="flex justify-center gap-2">
          {accidentals.map((a) => (
            <button
              key={a}
              onClick={() =>
                setSelectedAccidental(selectedAccidental === a ? "" : a)
              }
              title={`Tecla: ${a}`}
              aria-label={a === "#" ? "Sustenido" : "Bemol"}
              className={`${btnBase} w-14 ${
                selectedAccidental === a
                  ? "bg-orange-500 text-white"
                  : btnInactive
              }`}
            >
              {a}
            </button>
          ))}
        </div>

        <div className="w-3/4 border-t border-orange-500/30" />

        <div className="flex justify-center gap-2">
          {modes.map((m) => (
            <button
              key={m.value}
              onClick={() => setSelectedMode(m.value)}
              title={`Tecla: ${m.label === "Maior" ? "M" : "m"}`}
              aria-label={`Modo ${m.label.toLowerCase()}`}
              className={`h-12 rounded-lg px-6 text-base font-semibold transition-colors duration-150 ${
                selectedMode === m.value
                  ? "bg-orange-500 text-white"
                  : btnInactive
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </section>

      <section className={`group flex w-full flex-col items-center justify-center gap-4 rounded-xl p-8 border transition-colors duration-150 ${fieldSection} group-hover:border-orange-500 hover:shadow-[0_0_0_1px_rgba(249,115,22,0.25)]`}>
        <h2 className="text-base font-semibold tracking-wide text-zinc-500 transition-colors duration-150 group-hover:text-orange-500">
          Campo Harmônico
          <span
            className="ml-1.5 cursor-help text-xs opacity-60"
            title="Conjunto de acordes que pertencem à escala do tom selecionado"
          >ⓘ</span>
        </h2>
        <div className="flex w-full flex-wrap justify-center gap-x-5 gap-y-2">
          {field.numerals.map((num, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <span
                className="text-xs font-medium text-zinc-400"
                title="Grau da escala — I é o primeiro grau (tônica), II o segundo, etc."
              >
                {num}
              </span>
              <span
                className={`text-xl font-bold ${fieldChordCls}`}
                title={`Acorde: ${field.chords[i]}`}
              >
                {field.chords[i]}
              </span>
            </div>
          ))}
        </div>
      </section>

      {progressions.length > 0 && (
        <section className="flex w-full flex-col gap-8">
          <div className="flex items-center justify-between w-full">
            <h2 className={`text-lg font-semibold ${progTitle}`}>
              Progressões
              <span
                className="ml-1.5 cursor-help text-xs opacity-60"
                title="Progressão é a sequência de acordes tocados em uma música. Cada linha é um padrão famoso."
              >ⓘ</span>
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowDiagrams((v) => !v)}
                title="Tecla: V"
                aria-label="Alternar diagramas"
                aria-pressed={showDiagrams}
                className={`toggle-switch relative h-6 w-11 rounded-full shrink-0 transition-colors ${
                  showDiagrams ? "bg-orange-500" : toggleOff
                }`}
              >
                <span
                  className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    showDiagrams ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
              <span className={`text-xs whitespace-nowrap ${labelCls}`}>Diagramas</span>
            </div>
          </div>
          <div className="flex w-full flex-col gap-6">
            {(showAllProgressions ? progressions : progressions.slice(0, 3)).map((prog) => (
              <div
                key={prog.name}
                className={`group flex w-full flex-col gap-4 rounded-xl p-5 border transition-colors duration-150 ${cardCls} group-hover:border-orange-500 hover:shadow-[0_0_0_1px_rgba(249,115,22,0.25)]`}
              >
                <h3 className={`text-base font-semibold text-pretty break-words transition-colors duration-150 group-hover:text-orange-500 ${cardTitle}`}>
                  {prog.name}
                </h3>
                <p className="text-xs text-zinc-500">{prog.numerals}</p>
                <div className="flex flex-row flex-wrap md:flex-nowrap gap-4 md:gap-8 items-start justify-start min-w-0">
                  {prog.chords.map((chord, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      {showDiagrams ? (
                        <>
                          <span className={`text-sm font-bold ${fieldChordCls}`}>
                            {chord}
                          </span>
                          <ChordDiagram
                            instrument={instrument}
                            chordName={chord}
                            light={mounted ? theme === "light" : false}
                          />
                        </>
                      ) : (
                        <span className={`text-lg font-bold ${fieldChordCls}`}>
                          {chord}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={() => setShowAllProgressions((v) => !v)}
              aria-label={showAllProgressions ? "Mostrar menos progressões" : "Mostrar mais progressões"}
              className="h-10 rounded-lg px-6 text-sm font-semibold transition-colors duration-150 dark:bg-zinc-800 bg-zinc-200 dark:text-zinc-300 text-zinc-600 dark:hover:bg-zinc-700 hover:bg-zinc-300 hover:shadow-[0_0_0_1px_rgba(249,115,22,0.25)] focus-visible:outline-2 focus-visible:outline-orange-500 self-center"
            >
              {showAllProgressions ? "Mostrar Menos" : "Mostrar Mais"}
            </button>
          </div>
        </section>
      )}
    </>
  );
}
