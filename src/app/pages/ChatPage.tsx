import { FormEvent, useMemo, useState } from 'react';
import { MessageSquare, Send, Sparkles } from 'lucide-react';
import { appDataService } from '../services/appDataService';
import type { ChatMessageContract } from '../types/contracts';

function getAssistantReply(prompt: string) {
  const normalizedPrompt = prompt.toLowerCase();
  const tasks = appDataService.getTasks();

  if (normalizedPrompt.includes('urgente') || normalizedPrompt.includes('atras')) {
    const overdueTask = tasks.find((task) => task.status === 'atrasada');
    return overdueTask
      ? `A prioridade agora e ${overdueTask.title}. Feche primeiro a parte de "${overdueTask.checklist[0]}" e depois envie a atividade.`
      : 'Voce nao tem tarefa atrasada agora. O melhor passo e continuar a atividade em andamento com prioridade alta.';
  }

  if (normalizedPrompt.includes('redes neurais')) {
    return 'Resumo rapido: redes neurais combinam camadas, pesos e funcao de ativacao; exigem bons dados; pedem ajuste de hiperparametros; funcionam bem com validacao; e devem ser monitoradas contra overfitting.';
  }

  if (normalizedPrompt.includes('30 minutos') || normalizedPrompt.includes('plano de estudo')) {
    return 'Plano sugerido: 10 min para revisar a tarefa atrasada, 10 min para retomar a aula atual e 10 min para preparar a proxima aula.';
  }

  if (normalizedPrompt.includes('proxima aula') || normalizedPrompt.includes('revisar')) {
    return 'Antes da proxima aula, revise os conceitos-base de Machine Learning, releia suas anotacoes e abra o material da aula ao vivo para chegar com contexto.';
  }

  return 'Entendi. Posso te ajudar a destravar tarefas, resumir aulas ou montar um plano rapido de estudo com base na sua rotina atual.';
}

export function ChatPage() {
  const [messages, setMessages] = useState<ChatMessageContract[]>(() => appDataService.getChatMessages());
  const [input, setInput] = useState('');

  const canSend = input.trim().length > 0;
  const totalMessages = useMemo(() => messages.length - 1, [messages.length]);
  const quickPrompts = appDataService.getQuickChatPrompts();

  function sendMessage(text: string) {
    const cleanedText = text.trim();
    if (!cleanedText) return;

    const nextMessages = [
      ...messages,
      { id: messages.length + 1, role: 'user' as const, content: cleanedText },
      { id: messages.length + 2, role: 'assistant' as const, content: getAssistantReply(cleanedText) },
    ];

    setMessages(appDataService.saveChatMessages(nextMessages));
    setInput('');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(input);
  }

  return (
    <div className="mx-auto max-w-[1440px] px-8 py-7">
      <header className="mb-7 grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h1 className="mb-2 text-3xl font-semibold tracking-tight">Chat IA</h1>
          <p className="text-sm text-muted-foreground">
            Um espaco funcional para tirar duvidas, revisar conteudos e montar proximos passos sem sair da trilha.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-2">
              <MessageSquare size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Sessao ativa</p>
              <p className="text-xs text-muted-foreground">ajuda contextual</p>
            </div>
          </div>
          <p className="text-sm font-medium">{totalMessages} interacoes nesta sessao</p>
          <p className="mt-1 text-xs text-muted-foreground">Use os atalhos abaixo ou envie uma pergunta livre.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold">Conversa</h2>
            <p className="mt-1 text-sm text-muted-foreground">A IA responde com base na sua rotina atual de aulas e tarefas.</p>
          </div>

          <div className="mb-4 space-y-3">
            {messages.map((message) => (
              <article
                key={message.id}
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                  message.role === 'assistant'
                    ? 'bg-secondary text-foreground'
                    : 'ml-auto bg-primary text-primary-foreground'
                }`}
              >
                {message.content}
              </article>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="rounded-xl border border-border p-3">
            <label htmlFor="chat-input" className="sr-only">
              Digite sua pergunta para a IA
            </label>
            <textarea
              id="chat-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              rows={4}
              placeholder="Ex.: monte um plano de estudo de 30 minutos para hoje"
              className="w-full resize-none rounded-lg bg-transparent p-2 text-sm outline-none placeholder:text-muted-foreground"
            />

            <div className="mt-3 flex items-center justify-end">
              <button
                type="submit"
                disabled={!canSend}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={16} />
                Enviar
              </button>
            </div>
          </form>
        </section>

        <aside className="space-y-6">
          <section className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles size={18} className="text-primary" />
              <h2 className="text-base font-semibold">Atalhos de conversa</h2>
            </div>
            <div className="space-y-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="w-full rounded-xl border border-primary/20 bg-background/80 px-3 py-3 text-left text-sm text-foreground transition-colors hover:bg-background"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-base font-semibold">Como usar melhor</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Quanto mais concreta for sua pergunta, melhor a IA consegue transformar conteudo em proxima acao.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
