'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Link, Image, Type, Eye, Save, Upload, Minus, Quote, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Header from '@/components/Header'
import { useAuth } from '@/context/AuthContext'

export default function CommunityWritePage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('자유')
  const [fontSize, setFontSize] = useState('15')
  const [isPreview, setIsPreview] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { user } = useAuth()

  // Hook을 조건문 이전에 먼저 호출 - React Hook 규칙 준수
  useEffect(() => {
    // 로그인된 사용자만 임시저장 데이터 불러오기
    if (!user) return

    const savedDraft = localStorage.getItem('community-draft')
    if (savedDraft) {
      const draft = JSON.parse(savedDraft)
      if (confirm('임시저장된 내용이 있습니다. 불러오시겠어요?')) {
        setTitle(draft.title || '')
        setContent(draft.content || '')
        setCategory(draft.category || '자유')
        if (editorRef.current) {
          editorRef.current.innerHTML = draft.content || ''
        }
      }
    }
  }, [user])

  // 로그인 체크 - Hook 호출 이후에 조건부 렌더링
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">로그인이 필요합니다</h1>
            <p className="text-gray-600 mb-6">글을 작성하려면 먼저 로그인해주세요.</p>
            <Button onClick={() => router.push('/community')} variant="outline">
              커뮤니티로 돌아가기
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // 텍스트 포맷팅 함수
  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    if (editorRef.current) {
      editorRef.current.focus()
    }
  }

  // 색상 변경
  const changeColor = (color: string) => {
    document.execCommand('foreColor', false, color)
    if (editorRef.current) {
      editorRef.current.focus()
    }
  }

  // 폰트 크기 변경
  const changeFontSize = (size: string) => {
    setFontSize(size)
    document.execCommand('fontSize', false, '7')
    if (editorRef.current) {
      const fontElements = editorRef.current.querySelectorAll('font[size="7"]') as NodeListOf<HTMLElement>
      fontElements.forEach((el: HTMLElement) => {
        el.removeAttribute('size')
        el.style.fontSize = `${size}px`
      })
      editorRef.current.focus()
    }
  }

  // 이미지 삽입
  const insertImage = () => {
    const url = prompt('이미지 URL을 입력하세요:')
    if (url) {
      document.execCommand('insertImage', false, url)
    }
    if (editorRef.current) {
      editorRef.current.focus()
    }
  }

  // 링크 삽입
  const insertLink = () => {
    const url = prompt('링크 URL을 입력하세요:')
    if (url) {
      document.execCommand('createLink', false, url)
    }
    if (editorRef.current) {
      editorRef.current.focus()
    }
  }

  // 구분선 삽입
  const insertHorizontalRule = () => {
    document.execCommand('insertHTML', false, '<hr style="border: none; height: 1px; background-color: #e5e7eb; margin: 24px 0;" />')
    if (editorRef.current) {
      editorRef.current.focus()
    }
  }

  // 인용구 삽입
  const insertBlockquote = () => {
    const selection = window.getSelection()
    const selectedText = selection?.toString()
    
    if (selectedText) {
      document.execCommand('insertHTML', false, 
        `<blockquote style="border-left: 4px solid #d1d5db; padding-left: 16px; margin: 16px 0; color: #6b7280; font-style: italic; background-color: #f9fafb; padding: 12px 16px; border-radius: 8px;">${selectedText}</blockquote>`
      )
    } else {
      document.execCommand('insertHTML', false, 
        '<blockquote style="border-left: 4px solid #d1d5db; padding-left: 16px; margin: 16px 0; color: #6b7280; font-style: italic; background-color: #f9fafb; padding: 12px 16px; border-radius: 8px;">인용문을 입력하세요</blockquote>'
      )
    }
    if (editorRef.current) {
      editorRef.current.focus()
    }
  }

  // 임시저장
  const handleSaveDraft = () => {
    const draftData = { title, content, category }
    localStorage.setItem('community-draft', JSON.stringify(draftData))
    alert('임시저장되었습니다.')
  }

  // 게시글 발행
  const handleSubmit = async () => {
    if (!title.trim()) {
      alert('제목을 입력해주세요.')
      return
    }
    if (!content.trim()) {
      alert('내용을 입력해주세요.')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/community/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          category,
          author: user.name || user.email
        }),
      })

      if (response.ok) {
        const result = await response.json()
        // 임시저장 데이터 삭제
        localStorage.removeItem('community-draft')
        // 게시글 상세 페이지로 이동
        router.push(`/community/${result.id}`)
      } else {
        throw new Error('게시글 작성에 실패했습니다.')
      }
    } catch (error) {
      console.error('Error submitting post:', error)
      alert('게시글 작성 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // 취소
  const handleCancel = () => {
    if (title || content) {
      if (confirm('작성 중인 내용이 있습니다. 정말 나가시겠어요?')) {
        router.push('/community')
      }
    } else {
      router.push('/community')
    }
  }

  // 에디터 내용 변경 핸들러
  const handleEditorInput = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    setContent(target.innerHTML)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto bg-white min-h-screen">
        {/* 상단 헤더 */}
        <div className="border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              목록으로
            </Button>
            <h1 className="text-xl font-bold text-gray-900">글쓰기</h1>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="자유">자유게시판</option>
              <option value="질문">질문답변</option>
              <option value="팁">마사지팁</option>
            </select>
          </div>
        </div>

        {/* 제목 입력 */}
        <div className="border-b border-gray-200 p-4">
          <input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-2xl font-bold border-none outline-none placeholder-gray-400"
            maxLength={100}
          />
          <div className="text-right text-xs text-gray-400 mt-1">
            {title.length}/100
          </div>
        </div>

        {/* 툴바 */}
        <div className="border-b border-gray-200 p-3 bg-gray-50">
          <div className="flex flex-wrap items-center gap-1">
            {/* 폰트 크기 */}
            <select 
              value={fontSize}
              onChange={(e) => changeFontSize(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded text-sm"
            >
              <option value="12">12</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="18">18</option>
              <option value="20">20</option>
              <option value="24">24</option>
            </select>

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            {/* 텍스트 스타일 */}
            <button
              onClick={() => formatText('bold')}
              className="p-2 hover:bg-gray-200 rounded"
              title="굵게"
            >
              <Bold size={16} />
            </button>
            <button
              onClick={() => formatText('italic')}
              className="p-2 hover:bg-gray-200 rounded"
              title="기울임"
            >
              <Italic size={16} />
            </button>
            <button
              onClick={() => formatText('underline')}
              className="p-2 hover:bg-gray-200 rounded"
              title="밑줄"
            >
              <Underline size={16} />
            </button>
            <button
              onClick={() => formatText('strikeThrough')}
              className="p-2 hover:bg-gray-200 rounded"
              title="취소선"
            >
              <Strikethrough size={16} />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            {/* 텍스트 정렬 */}
            <button
              onClick={() => formatText('justifyLeft')}
              className="p-2 hover:bg-gray-200 rounded"
              title="왼쪽 정렬"
            >
              <AlignLeft size={16} />
            </button>
            <button
              onClick={() => formatText('justifyCenter')}
              className="p-2 hover:bg-gray-200 rounded"
              title="가운데 정렬"
            >
              <AlignCenter size={16} />
            </button>
            <button
              onClick={() => formatText('justifyRight')}
              className="p-2 hover:bg-gray-200 rounded"
              title="오른쪽 정렬"
            >
              <AlignRight size={16} />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            {/* 목록 */}
            <button
              onClick={() => formatText('insertUnorderedList')}
              className="p-2 hover:bg-gray-200 rounded"
              title="불릿 목록"
            >
              <List size={16} />
            </button>
            <button
              onClick={() => formatText('insertOrderedList')}
              className="p-2 hover:bg-gray-200 rounded"
              title="번호 목록"
            >
              <ListOrdered size={16} />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            {/* 구분선 및 인용구 */}
            <button
              onClick={insertHorizontalRule}
              className="p-2 hover:bg-gray-200 rounded"
              title="구분선"
            >
              <Minus size={16} />
            </button>
            <button
              onClick={insertBlockquote}
              className="p-2 hover:bg-gray-200 rounded"
              title="인용구"
            >
              <Quote size={16} />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            {/* 텍스트 색상 */}
            <div className="flex items-center gap-1">
              <Type size={16} className="text-gray-600" />
              <input
                type="color"
                onChange={(e) => changeColor(e.target.value)}
                className="w-6 h-6 border-none cursor-pointer"
                title="텍스트 색상"
              />
            </div>

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            {/* 링크 및 이미지 */}
            <button
              onClick={insertLink}
              className="p-2 hover:bg-gray-200 rounded"
              title="링크 삽입"
            >
              <Link size={16} />
            </button>
            <button
              onClick={insertImage}
              className="p-2 hover:bg-gray-200 rounded"
              title="이미지 삽입"
            >
              <Image size={16} />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            {/* 미리보기 */}
            <button
              onClick={() => setIsPreview(!isPreview)}
              className={`p-2 rounded ${isPreview ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}
              title="미리보기"
            >
              <Eye size={16} />
            </button>
          </div>
        </div>

        {/* 에디터 영역 */}
        <div className="min-h-96 p-4">
          {isPreview ? (
            <div className="prose max-w-none">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full mb-2">
                  {category}
                </span>
                <h1 className="text-2xl font-bold mb-2">{title || '제목을 입력하세요'}</h1>
                <div className="text-sm text-gray-500 mb-4">
                  작성자: {user?.name || user?.email}
                </div>
              </div>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          ) : (
            <div
              ref={editorRef}
              contentEditable
              onInput={handleEditorInput}
              className="min-h-96 outline-none leading-relaxed"
              style={{ fontSize: `${fontSize}px` }}
              data-placeholder="마사지에 관한 이야기를 들려주세요..."
              suppressContentEditableWarning={true}
            />
          )}
        </div>

        {/* 하단 액션 버튼 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={handleSaveDraft}
                className="flex items-center gap-2"
              >
                <Upload size={16} />
                임시저장
              </Button>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={handleCancel}
              >
                취소
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                <Save size={16} />
                {isSubmitting ? '발행 중...' : '발행'}
              </Button>
            </div>
          </div>
        </div>

        {/* CSS for editor styling */}
        <style dangerouslySetInnerHTML={{
          __html: `
            [contenteditable]:empty:before {
              content: attr(data-placeholder);
              color: #9CA3AF;
              pointer-events: none;
            }
            
            [contenteditable] img {
              max-width: 100%;
              height: auto;
              border-radius: 8px;
              margin: 16px 0;
            }
            
            [contenteditable] a {
              color: #3B82F6;
              text-decoration: underline;
            }
            
            [contenteditable] ul, [contenteditable] ol {
              padding-left: 24px;
              margin: 16px 0;
            }
            
            [contenteditable] li {
              margin: 4px 0;
            }
            
            [contenteditable] blockquote {
              border-left: 4px solid #d1d5db;
              padding-left: 16px;
              margin: 16px 0;
              color: #6b7280;
              font-style: italic;
              background-color: #f9fafb;
              padding: 12px 16px;
              border-radius: 8px;
            }
            
            [contenteditable] hr {
              border: none;
              height: 1px;
              background-color: #e5e7eb;
              margin: 24px 0;
            }
          `
        }} />
      </div>
    </div>
  )
}