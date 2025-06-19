import { ref } from 'vue'
import { doc, getDoc, updateDoc, onSnapshot, increment } from 'firebase/firestore'
import { db } from '../services/firebase'

const counterRef = doc(db, 'counters', 'invoice')

export function useInvoiceCounter() {
    const count = ref<number>(0)

    async function fetchInitialCount() {
        const snap = await getDoc(counterRef)
        if (snap.exists()) {
            count.value = snap.data().totalInvoices
        }
    }

    function subscribeToInvoiceCount(callback: (newCount: number) => void) {
        fetchInitialCount()
        onSnapshot(counterRef, (snap) => {
            if (snap.exists()) {
                const value = snap.data().totalInvoices
                count.value = value
                callback(value)
            }
        })
    }

    async function incrementInvoiceCount() {
        await updateDoc(counterRef, {
            totalInvoices: increment(1)
        })
    }

    return { count, subscribeToInvoiceCount, incrementInvoiceCount }
}