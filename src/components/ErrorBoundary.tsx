"use client";

import { Component } from "react";

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
          <p className="text-zinc-400 text-sm">Algo deu errado ao carregar a ferramenta.</p>
          <button
            onClick={() => { this.setState({ hasError: false }); window.location.reload() }}
            className="h-10 rounded-lg px-6 text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
