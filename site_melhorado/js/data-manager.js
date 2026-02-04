/**
 * Sistema de Gerenciamento de Dados do Diário Eletrônico
 * Gerencia dados de alunos, notas e frequência de forma centralizada
 */

class DataManager {
    constructor() {
        this.students = this.loadStudents();
        this.subjects = this.loadSubjects();
        this.grades = this.loadGrades();
        this.attendance = this.loadAttendance();
    }

    // ========== GERENCIAMENTO DE ALUNOS ==========
    
    loadStudents() {
        const defaultStudents = [
            { id: 'asaf', name: 'ASAF ALCHAAR RAMALHO DE OLIVEIRA', active: true },
            { id: 'aymar', name: 'AYMAR FERREIRA TELES', active: true },
            { id: 'carlos', name: 'CARLOS GOMES HAUEISEN FREIRE', active: true },
            { id: 'guilherme', name: 'GUILHERME AUGUSTO RODRIGUES NASCIMENTO', active: true },
            { id: 'gustavo', name: 'GUSTAVO HENRIQUE RODRIGUES NASCIMENTO', active: true },
            { id: 'joao', name: 'JOÃO CARLOS MACIEL DOS SANTOS', active: true },
            { id: 'julio', name: 'JULIO KENNEDY SILVA SOUZA', active: true },
            { id: 'luis', name: 'LUIS FELIPE ALVES PEREIRA', active: true }
        ];
        
        const saved = localStorage.getItem('students');
        return saved ? JSON.parse(saved) : defaultStudents;
    }

    saveStudents() {
        localStorage.setItem('students', JSON.stringify(this.students));
    }

    getStudents() {
        return this.students.filter(student => student.active);
    }

    getStudent(id) {
        return this.students.find(student => student.id === id);
    }

    addStudent(name) {
        const id = name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
        const student = {
            id: id,
            name: name.toUpperCase(),
            active: true
        };
        this.students.push(student);
        this.saveStudents();
        return student;
    }

    // ========== GERENCIAMENTO DE DISCIPLINAS ==========
    
    loadSubjects() {
        const defaultSubjects = [
            { id: 'montagem1', name: 'Montagem e Manutenção I', icon: 'fas fa-tools' },
            { id: 'fundamentos', name: 'Fundamentos de Informática', icon: 'fas fa-laptop-code' },
            { id: 'introducao', name: 'Introdução a Sistemas Operacionais', icon: 'fas fa-desktop' },
            { id: 'logica', name: 'Lógica de Programação', icon: 'fas fa-code' },
            { id: 'montagem2', name: 'Montagem e Manutenção II', icon: 'fas fa-tools' },
            { id: 'sistemas', name: 'Sistemas Operacionais', icon: 'fas fa-server' }
        ];
        
        const saved = localStorage.getItem('subjects');
        return saved ? JSON.parse(saved) : defaultSubjects;
    }

    saveSubjects() {
        localStorage.setItem('subjects', JSON.stringify(this.subjects));
    }

    getSubjects() {
        return this.subjects;
    }

    getSubject(id) {
        return this.subjects.find(subject => subject.id === id);
    }

    // ========== GERENCIAMENTO DE NOTAS ==========
    
    loadGrades() {
        const saved = localStorage.getItem('grades');
        return saved ? JSON.parse(saved) : {};
    }

    saveGrades() {
        localStorage.setItem('grades', JSON.stringify(this.grades));
    }

    getStudentGrades(studentId, subjectId) {
        const key = `${studentId}_${subjectId}`;
        return this.grades[key] || {
            activities: 0,
            works: 0,
            tests: 0,
            final: 0,
            recovery: 0,
            average: 0,
            status: 'Não avaliado'
        };
    }

    setStudentGrades(studentId, subjectId, grades) {
        const key = `${studentId}_${subjectId}`;
        
        // Calcula a média ponderada
        const average = (
            (grades.activities || 0) * 0.3 +
            (grades.works || 0) * 0.2 +
            (grades.tests || 0) * 0.3 +
            (grades.final || 0) * 0.2
        );

        // Determina o status
        let status;
        if (grades.recovery > 0) {
            const finalAverage = average * 0.6 + grades.recovery * 0.4;
            status = finalAverage >= 5.5 ? 'Aprovado após recuperação' : 'Reprovado após recuperação';
        } else {
            if (average >= 6) status = 'Aprovado';
            else if (average >= 4) status = 'Recuperação';
            else status = 'Reprovado';
        }

        this.grades[key] = {
            ...grades,
            average: parseFloat(average.toFixed(1)),
            status: status
        };

        this.saveGrades();
        return this.grades[key];
    }

    getSubjectGrades(subjectId) {
        const students = this.getStudents();
        return students.map(student => ({
            student: student,
            grades: this.getStudentGrades(student.id, subjectId)
        }));
    }

    getStudentAllGrades(studentId) {
        const subjects = this.getSubjects();
        return subjects.map(subject => ({
            subject: subject,
            grades: this.getStudentGrades(studentId, subject.id)
        }));
    }

    // ========== GERENCIAMENTO DE FREQUÊNCIA ==========
    
    loadAttendance() {
        const saved = localStorage.getItem('attendance');
        return saved ? JSON.parse(saved) : {};
    }

    saveAttendance() {
        localStorage.setItem('attendance', JSON.stringify(this.attendance));
    }

    getStudentAttendance(studentId, subjectId) {
        const key = `${studentId}_${subjectId}`;
        return this.attendance[key] || {
            totalClasses: 0,
            attendedClasses: 0,
            percentage: 0,
            status: 'Sem dados'
        };
    }

    setStudentAttendance(studentId, subjectId, attendanceData) {
        const key = `${studentId}_${subjectId}`;
        
        const percentage = attendanceData.totalClasses > 0 
            ? (attendanceData.attendedClasses / attendanceData.totalClasses) * 100 
            : 0;

        let status;
        if (percentage >= 75) status = 'Aprovado';
        else if (percentage >= 60) status = 'Atenção';
        else status = 'Reprovado por falta';

        this.attendance[key] = {
            ...attendanceData,
            percentage: parseFloat(percentage.toFixed(1)),
            status: status
        };

        this.saveAttendance();
        return this.attendance[key];
    }

    getSubjectAttendance(subjectId) {
        const students = this.getStudents();
        return students.map(student => ({
            student: student,
            attendance: this.getStudentAttendance(student.id, subjectId)
        }));
    }

    getStudentAllAttendance(studentId) {
        const subjects = this.getSubjects();
        return subjects.map(subject => ({
            subject: subject,
            attendance: this.getStudentAttendance(studentId, subject.id)
        }));
    }

    // ========== RELATÓRIOS E ESTATÍSTICAS ==========
    
    getClassStatistics(subjectId) {
        const gradesData = this.getSubjectGrades(subjectId);
        const attendanceData = this.getSubjectAttendance(subjectId);
        
        const totalStudents = gradesData.length;
        let approvedGrades = 0;
        let recoveryGrades = 0;
        let failedGrades = 0;
        let approvedAttendance = 0;
        let totalAverage = 0;
        let totalAttendancePercentage = 0;

        gradesData.forEach(item => {
            const status = item.grades.status;
            if (status.includes('Aprovado')) approvedGrades++;
            else if (status.includes('Recuperação')) recoveryGrades++;
            else failedGrades++;
            
            totalAverage += item.grades.average;
        });

        attendanceData.forEach(item => {
            if (item.attendance.status === 'Aprovado') approvedAttendance++;
            totalAttendancePercentage += item.attendance.percentage;
        });

        return {
            totalStudents,
            grades: {
                approved: approvedGrades,
                recovery: recoveryGrades,
                failed: failedGrades,
                average: totalStudents > 0 ? (totalAverage / totalStudents).toFixed(1) : 0
            },
            attendance: {
                approved: approvedAttendance,
                average: totalStudents > 0 ? (totalAttendancePercentage / totalStudents).toFixed(1) : 0
            }
        };
    }

    getStudentOverview(studentId) {
        const student = this.getStudent(studentId);
        const allGrades = this.getStudentAllGrades(studentId);
        const allAttendance = this.getStudentAllAttendance(studentId);
        
        let totalAverage = 0;
        let totalAttendance = 0;
        let approvedSubjects = 0;
        
        allGrades.forEach(item => {
            totalAverage += item.grades.average;
            if (item.grades.status.includes('Aprovado')) {
                approvedSubjects++;
            }
        });

        allAttendance.forEach(item => {
            totalAttendance += item.attendance.percentage;
        });

        const subjectCount = this.subjects.length;
        
        return {
            student,
            generalAverage: subjectCount > 0 ? (totalAverage / subjectCount).toFixed(1) : 0,
            generalAttendance: subjectCount > 0 ? (totalAttendance / subjectCount).toFixed(1) : 0,
            approvedSubjects,
            totalSubjects: subjectCount,
            subjects: allGrades.map((gradeItem, index) => ({
                subject: gradeItem.subject,
                grades: gradeItem.grades,
                attendance: allAttendance[index].attendance
            }))
        };
    }

    // ========== UTILITÁRIOS ==========
    
    exportData() {
        return {
            students: this.students,
            subjects: this.subjects,
            grades: this.grades,
            attendance: this.attendance,
            exportDate: new Date().toISOString()
        };
    }

    importData(data) {
        if (data.students) {
            this.students = data.students;
            this.saveStudents();
        }
        if (data.subjects) {
            this.subjects = data.subjects;
            this.saveSubjects();
        }
        if (data.grades) {
            this.grades = data.grades;
            this.saveGrades();
        }
        if (data.attendance) {
            this.attendance = data.attendance;
            this.saveAttendance();
        }
    }

    clearAllData() {
        localStorage.removeItem('students');
        localStorage.removeItem('subjects');
        localStorage.removeItem('grades');
        localStorage.removeItem('attendance');
        
        this.students = this.loadStudents();
        this.subjects = this.loadSubjects();
        this.grades = {};
        this.attendance = {};
    }
}

// Instância global do gerenciador de dados
window.dataManager = new DataManager();

