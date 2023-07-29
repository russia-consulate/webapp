import { ServiceNotWorkingPage } from '@pages/shared'
import { H } from 'highlight.run'
import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    H.consumeError(error)
    return { error }
  }

  state: State = {
    error: null,
  }

  render() {
    const { error } = this.state
    const { children } = this.props

    if (!error) {
      return children
    }

    return <ServiceNotWorkingPage />
  }
}
