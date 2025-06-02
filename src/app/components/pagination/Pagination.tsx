import { Paginator } from '@/types/general';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react'
import Button from '../button/Button';

export const Pagination = (
    {
        currentPage,
        totalPage,
        paginator,
        handlePageChange,
    }: {
        currentPage: number;
        totalPage: number;
        paginator: Paginator;
        handlePageChange: (page: number) => void;
    }
) => {
    let ellipsisShownLeft = false;
    let ellipsisShownRight = false;
    return (
        <section className="flex items-center justify-center w-full p-4 mt-3">
            <div className="lg:flex items-center space-x-2 hidden">
                {
                    currentPage > 1 && (
                        <Button
                            disabled={currentPage === 1}
                            className="bg-white-500 text-gold-500 rounded-lg p-1 font-semibold border-gold-500 border-1 sm:w-[3rem] flex items-center justify-center"
                            onClick={() => handlePageChange(currentPage - 1)}>
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                    )
                }
                {
                    Array.from({ length: totalPage }, (_, index) => {
                        const page = index + 1;
                        const isFirstPage = page === 1;
                        const isLastPage = page === totalPage;
                        const isNearCurrent = Math.abs(page - currentPage) <= 2

                        if (isFirstPage || isLastPage || isNearCurrent) {
                            return (
                                <Button
                                    key={index}
                                    className={`bg-white-500 text-gold-500 rounded-lg p-1 font-semibold border-gold-500 border-1 sm:w-[3rem] flex items-center justify-center ${currentPage === index + 1 ? 'bg-gold-500 text-white' : ''}`}
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </Button>
                            )
                        }

                        if (page < currentPage && !ellipsisShownLeft) {
                            ellipsisShownLeft = true;
                            return <span key={`left-${index}`} className="text-gray-400">...</span>;
                        }

                        if (page > currentPage && !ellipsisShownRight) {
                            ellipsisShownRight = true;
                            return <span key={`right-${index}`} className="text-gray-400">...</span>;
                        }

                        return null
                    })
                }
                {
                    currentPage < totalPage && (
                        <Button
                            disabled={currentPage === totalPage}
                            className="bg-white-500 text-gold-500 rounded-lg p-1 font-semibold border-gold-500 border-1 sm:w-[3rem] flex items-center justify-center"
                            onClick={() => handlePageChange(currentPage + 1)} >
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    )
                }
            </div>
            <div className="lg:hidden flex items-center justify-evenly w-full space-x-3">
                {
                    currentPage > 1 && (
                        <div className="w-[50%]">
                            <Button
                                disabled={!paginator?.hasPrevPage}
                                className={`${!paginator?.hasPrevPage ? 'opacity-50' : 'opacity-100'} bg-white-500 text-gold-500 rounded-lg p-1 font-semibold border-gold-500 border-1 w-full flex items-center justify-center`}
                                onClick={() => handlePageChange(currentPage - 1)}>
                                Sebelumnya
                            </Button>
                        </div>
                    )
                }
                {
                    currentPage < totalPage && (
                        <div className="w-[50%]">
                            <Button
                                disabled={!paginator?.hasNextPage}
                                className={`${!paginator?.hasNextPage ? 'opacity-50' : 'opacity-100'} bg-white-500 text-gold-500 rounded-lg p-1 font-semibold border-gold-500 border-1 w-full flex items-center justify-center`}
                                onClick={() => handlePageChange(currentPage + 1)}>
                                Selanjutnya
                            </Button>
                        </div>
                    )
                }
            </div>
        </section >
    )
}
