import { Card, CardContent } from "../ui/card";

export default function LoaidngLayoutCatalogoUi() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white animate-in fade-in duration-500">


            {/* Main Content Skeleton */}
            <main className="max-w-[95%] mx-auto px-6 py-8">
                <div className="grid lg:grid-cols-5 gap-8 mb-12">

                    {/* Info Panel Skeleton */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Brand Info Skeleton */}
                        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-slate-200 rounded-xl animate-pulse" />
                                    <div className="flex-1">
                                        <div className="w-20 h-6 bg-slate-200 rounded mb-2 animate-pulse" />
                                        <div className="w-32 h-4 bg-slate-200 rounded animate-pulse" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <div className="w-16 h-4 bg-slate-200 rounded mb-1 animate-pulse" />
                                        <div className="w-40 h-5 bg-slate-200 rounded animate-pulse" />
                                    </div>
                                    <div>
                                        <div className="w-20 h-4 bg-slate-200 rounded mb-1 animate-pulse" />
                                        <div className="w-28 h-5 bg-slate-200 rounded animate-pulse" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Skeleton */}
                        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                            <CardContent className="p-6">
                                <div className="w-28 h-5 bg-slate-200 rounded mb-4 animate-pulse" />
                                <div className="space-y-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-full h-10 bg-slate-200 rounded-full animate-pulse" />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Stats Skeleton */}
                        <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-200 to-slate-300">
                            <CardContent className="p-6">
                                <div className="w-36 h-5 bg-white/30 rounded mb-4 animate-pulse" />
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center">
                                        <div className="w-12 h-8 bg-white/40 rounded mx-auto mb-2 animate-pulse" />
                                        <div className="w-16 h-4 bg-white/30 rounded mx-auto animate-pulse" />
                                    </div>
                                    <div className="text-center">
                                        <div className="w-12 h-8 bg-white/40 rounded mx-auto mb-2 animate-pulse" />
                                        <div className="w-16 h-4 bg-white/30 rounded mx-auto animate-pulse" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    {/* Large Catalog Image Skeleton */}
                    <div className="lg:col-span-3">
                        <Card className="border-0 shadow-2xl bg-white overflow-hidden p-0">
                            <CardContent className="p-0">
                                <div className="relative">
                                    {/* Main Image Skeleton */}
                                    <div className="aspect-[4/5] relative bg-gradient-to-br from-slate-200 to-slate-300 animate-pulse">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <div className="w-24 h-6 bg-white/30 rounded-full mb-3 animate-pulse" />
                                            <div className="w-3/4 h-8 bg-white/40 rounded mb-2 animate-pulse" />
                                            <div className="w-1/2 h-6 bg-white/30 rounded animate-pulse" />
                                        </div>
                                    </div>


                                </div>

                                {/* Bottom Actions Skeleton */}
                                <div className="p-6 bg-gradient-to-r from-slate-200 to-slate-300">
                                    <div className="flex gap-3">
                                        <div className="flex-1 h-12 bg-slate-300 rounded-full animate-pulse" />
                                        <div className="flex-1 h-12 bg-slate-300 rounded-full animate-pulse" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>

                {/* Flipbook Section Skeleton */}
                <div className="space-y-6">
                    <div className="text-center">
                        <div className="w-80 h-9 bg-slate-200 rounded mx-auto mb-3 animate-pulse" />
                        <div className="w-96 h-6 bg-slate-200 rounded mx-auto animate-pulse" />
                    </div>

                    <Card className="border-0 shadow-2xl bg-white overflow-hidden">
                        <CardContent className="p-8">
                            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-8 min-h-[700px] flex items-center justify-center animate-pulse">
                                <div className="text-center space-y-6">
                                    <div className="w-20 h-20 bg-slate-300 rounded-full mx-auto animate-pulse" />
                                    <div className="w-48 h-6 bg-slate-300 rounded mx-auto animate-pulse" />
                                    <div className="w-64 h-4 bg-slate-300 rounded mx-auto animate-pulse" />
                                    <div className="w-40 h-12 bg-slate-300 rounded-full mx-auto animate-pulse" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}