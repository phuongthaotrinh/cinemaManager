import React, { useState, useEffect } from 'react'
import { useAppSelector } from '../redux/hook'

type Props = {
  id?: string | undefined
}

const useSelectMovie = ({ id }: Props) => {
  const { movie, isLoading } = useAppSelector((state) => state.movie);

  if (typeof id == "undefined") {
  }


  return { isLoading }
}

export default useSelectMovie
